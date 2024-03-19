import { supabase } from './supabaseClient';
import type { ProviderType } from './types';
import { open as shellOpen } from '@tauri-apps/plugin-shell';

function getLocalHostUrl(port: number) {
	return `http://localhost:${port}`;
}

export async function onProviderSignIn(provider: ProviderType, port: number) {
	const { data, error } = await supabase.auth.signInWithOAuth({
		options: {
			skipBrowserRedirect: true,
			scopes: provider === 'google' ? 'profile email' : '',
			redirectTo: getLocalHostUrl(port!)
		},
		provider: provider
	});

	if (data.url) {
		shellOpen(data.url);
	} else {
		alert(error?.message);
	}
}

export async function handleSignIn(email: string, port: number) {
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: { emailRedirectTo: getLocalHostUrl(port!) }
	});

	if (error) {
		return { successfull: false, message: error.message };
	} else {
		return { successfull: true, message: 'Check your email for the login link!' };
	}
}
