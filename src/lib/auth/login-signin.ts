import { supabase } from './supabaseClient';
import type { ProviderType } from './types';
import { open as shellOpen } from '@tauri-apps/plugin-shell';
import toast from 'svelte-french-toast';
import type { User as SupaUser } from '@supabase/supabase-js';
import type { NewLocalUser } from '@/db/users/schema';
import { createUser, getUserByID } from '@/db/users/handler';
import { goto } from '$app/navigation';

function getLocalHostUrl(port: number) {
	return `http://localhost:${port}`;
}

export async function onProviderSignIn(provider: ProviderType, port: number) {
	switch (provider) {
		case 'github':
			return await handleSignInWithGithub(port);
		case 'google':
			return await handleSignInWithGithub(port);
	}
	return undefined;
}

export async function handleSignInWithGoogle(port: number) {
	const { data, error } = await supabase.auth.signInWithOAuth({
		options: {
			skipBrowserRedirect: true,
			scopes: 'profile email',
			redirectTo: getLocalHostUrl(port!),
			queryParams: {
				access_type: 'offline',
				prompt: 'consent'
			}
		},
		provider: 'google'
	});

	if (data.url) {
		shellOpen(data.url);
	} else {
		toast.error(error?.message ?? 'unable to authenficate');
	}
	return { data, error };
}

export async function handleSignInWithGithub(port: number) {
	const { data, error } = await supabase.auth.signInWithOAuth({
		options: {
			skipBrowserRedirect: true,
			scopes: '',
			redirectTo: getLocalHostUrl(port!)
		},
		provider: 'github'
	});

	if (data.url) {
		shellOpen(data.url);
	} else {
		toast.error(error?.message ?? 'unable to authenficate');
	}
	return { data, error };
}

export async function signUpNewUser(email: string, password: string, port: number) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: getLocalHostUrl(port!)
		}
	});

	if (error) {
		return { successfull: false, message: error.message };
	} else {
		return { successfull: true, message: 'Check your email for the login link!' };
	}
}

export function getUserDataFromProvider(user: SupaUser): NewLocalUser | undefined {
	let {
		id,
		email,
		app_metadata: { provider },
		user_metadata
	} = user;
	if (email == undefined) return undefined;

	if (provider == 'github') {
		let { avatar_url, name, user_name } = user_metadata;
		let newUser: NewLocalUser = {
			email,
			id,
			userName: user_name,
			name,
			avatar: avatar_url
		};
		return newUser;
	}

	return { email, id };
}

export async function createNewUserFromProvider(user: SupaUser) {
	let userDatas = getUserDataFromProvider(user);
	if (userDatas == undefined) {
		toast.error('Unable to retrieve your email');
		return;
	}

	let res = await createUser(userDatas);
	return res;
}

export async function localLogOut() {
	// sign out from the current session only
	let {error} = await supabase.auth.signOut({ scope: 'local' });

	if(error){
		toast.error(error.message);
	} else {
		goto("/signup")
	}
}
