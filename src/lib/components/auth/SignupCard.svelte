<script lang="ts">
	export let data: SuperValidated<NewOnlineUser>;

	import { Icons } from '$lib/components/icons';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Reload } from 'svelte-radix';
	import toast from 'svelte-french-toast';
	import {
		getUserDataFromProvider,
		signUpNewUser,
		onProviderSignIn,
		createNewUserFromProvider
	} from '@/auth/login-signin';
	import { listen } from '@tauri-apps/api/event';
	import { supabase } from '@/auth/supabaseClient';
	import { createEventDispatcher, onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/core';
	import type { ProviderType } from '@/auth/types';
	import {
		insertOnlineUserFormSchema,
		insertOnlineUserSchema,
		type NewLocalUser,
		type NewOnlineUser
	} from '@/db/users/schema';
	import { setError, setMessage, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';

	const dispatch = createEventDispatcher();

	let loading = false;
	let port: number | undefined = undefined;

	const unlisten = listen('oauth://url', async (data) => {
		if (!data.payload) return;

		const url = new URL(data.payload as string);
		const code = new URLSearchParams(url.search).get('code');

		console.log('listen : oauth : ', data.payload, code);
		if (code) {
			getSession(code);
		}
	});

	async function getSession(code: string) {
		let { data, error } = await supabase.auth.exchangeCodeForSession(code);
		if (error) {
			toast.error(error.message);
			return;
		}

		let { user, session } = data;
		if (user == null) {
			toast.error('No userdata retrieved');
			return;
		}

		try {
			let newUser = await createNewUserFromProvider(user);
			if (newUser == undefined) {
				toast.error('Unable to create a new user');
				return;
			}

			port = undefined;

			toast.success('Successful identification');

			dispatch('redirect', { path: '/app' });
		} catch (err) {
			toast.error(`Auth error : ${err}`);
			console.error(`Auth error : ${err}`)
		}
	}

	async function submitSignup(email: string, password: string) {
		if (email && port != undefined) {
			loading = true;
			let response = await signUpNewUser(email, password, port);
			loading = false;

			if (response.successfull) {
				toast.success('Your account was created');
			} else {
				toast.error(response.message);
			}
		}
	}

	async function useProvider(provider: ProviderType) {
		if (port == undefined) return;

		loading = true;

		let response = await onProviderSignIn(provider, port);

		loading = false;
	}

	const form = superForm(data, {
		SPA: true,
		validators: zod(insertOnlineUserSchema),

		onUpdate({ form }) {
			// Form validation
			if (form.data.email.includes('spam')) {
				setError(form, 'email', 'Suspicious email address.');
			} else if (form.valid) {
				setMessage(form, 'Valid data!');
			}
		},

		onSubmit({ cancel, formData }) {
			try {
				let { email, password } = insertOnlineUserFormSchema.parse(formData);
				submitSignup(email, password);
			} catch (error) {
				console.error('---- parse error: ', error);
			}
		}
	});

	const { form: formData, errors, message, constraints, enhance } = form;

	onMount(() => {
		invoke('oauth_start').then(async (resPort) => {
			port = resPort as number;
		});

		return () => {
			unlisten?.then((u) => u());
			//invoke('oauth_cancel', { port });
		};
	});
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Create an account</Card.Title>
		<Card.Description>Enter your email below to create your account</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid grid-cols-2 gap-6">
			<Button variant="outline" on:click={() => useProvider('github')}>
				<Icons.gitHub class="w-4 h-4 mr-2" />
				GitHub
			</Button>
			<Button variant="outline" on:click={() => useProvider('google')}>
				<Icons.google class="w-4 h-4 mr-2" />
				Google
			</Button>
		</div>
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t" />
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="px-2 bg-card text-muted-foreground"> Or continue with </span>
			</div>
		</div>
		<form method="POST" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} type="email" placeholder="m@example.com" />
				</Form.Control>
				<Form.Description>Please enter your email.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.Description>Please enter your password.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="w-full" disabled={loading}
				>{#if loading}
					<Reload class="w-4 h-4 mr-2 animate-spin" />
					<span>Creating</span>
				{:else}
					<span>Create account</span>
				{/if}</Form.Button
			>
		</form>
	</Card.Content>
	<Card.Footer>
		{#if $message}<h3>{$message}</h3>{/if}
	</Card.Footer>
</Card.Root>
