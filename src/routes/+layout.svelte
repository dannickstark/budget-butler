<script lang="ts">
	import { invalidate } from '$app/navigation';
	import '$lib/styles/app.css';
	import { fullWindow } from '$lib/utils/tailwindGroups';
	import { session } from '$stores/auth';
	import { supabase } from '@/auth/supabaseClient';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	let mounted = false;

	onMount(async () => {
		let {
			data: { session: resSession }
		} = await supabase.auth.getSession();

		if (resSession) {
			$session = resSession;
			const { data } = supabase.auth.onAuthStateChange((event, _session) => {
				if (_session?.expires_at !== resSession?.expires_at) {
					invalidate('supabase:auth');
				}
			});
		}

		mounted = true;
	});
</script>

<div class={fullWindow}>
	<Toaster containerClassName="flex flex-col flex-reverse" position="bottom-center" />
	{#if mounted}
		<slot />
	{/if}
</div>
