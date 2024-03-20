<script lang="ts">
	export let data;

	import '../app.css';
	import { migrate } from '$lib/db/migrate';
	import { onMount } from 'svelte';
	import { fullWindow } from '$lib/utils/tailwindGroups';
	import { Toaster } from 'svelte-french-toast';
	import { invalidate } from '$app/navigation';
	import { supabase } from '@/auth/supabaseClient';
	import { session } from '$stores/auth';

	let hasMounted = false;

	onMount(async () => {
		await migrate();

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

		hasMounted = true;

		/* return () => {
			data.subscription.unsubscribe()
		}; */
	});
</script>

<div class={fullWindow}>
	<Toaster containerClassName="flex flex-col flex-reverse" position="bottom-center" />
	{#if hasMounted}
		<slot />
	{/if}
</div>
