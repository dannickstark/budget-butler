<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Reload } from 'svelte-radix';
	import toast from 'svelte-french-toast';
	import { handleSignIn, onProviderSignIn } from '@/auth/login';
	import { listen } from '@tauri-apps/api/event';
	import { supabase } from '@/auth/supabaseClient';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/core';
	import type { ProviderType } from '@/auth/types';
	import { redirect } from '@sveltejs/kit';

	let loading = false;
	let email: string | undefined = undefined;
	let port: number | undefined = undefined;

	const unlisten = listen('oauth://url', (data) => {
		if (!data.payload) return;

		const url = new URL(data.payload as string);
		const code = new URLSearchParams(url.search).get('code');

		console.log('here', data.payload, code);
		if (code) {
			supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
				if (error) {
					alert(error.message);
					console.error(error);
					return;
				}

				port = undefined;
				redirect(303, '/');
			});
		}
	});

	async function submitSignup() {
		if (email && port != undefined) {
			loading = true;
			let response = await handleSignIn(email, port);
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

	onMount(() => {
		invoke('oauth_start').then(async (resPort) => {
			port = resPort as number;
		});

		return () => {
			unlisten?.then((u) => u());
			invoke('oauth_cancel', { port });
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
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" disabled={loading} on:click={submitSignup}>
			{#if loading}
				<Reload class="w-4 h-4 mr-2 animate-spin" />
				<span>Creating</span>
			{:else}
				<span>Create account</span>
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
