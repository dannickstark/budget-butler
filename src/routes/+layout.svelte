<script lang="ts">
	export let data;

	import '../app.css';
	import { migrate } from '$lib/db/migrate';
	import { onMount } from 'svelte';
	import { fullWindow } from '$lib/utils/tailwindGroups';
	import { Toaster } from 'svelte-french-toast';
	import { invalidate } from '$app/navigation';
	import { supabase } from '@/auth/supabaseClient';

	onMount(() => {
		migrate().then(() => {
			supabase.auth.getSession().then((res) => {
				let {
					data: { session }
				} = res;

				const { data } = supabase.auth.onAuthStateChange((event, _session) => {
					if (_session?.expires_at !== session?.expires_at) {
						invalidate('supabase:auth');
					}
				});
			});
		});

		return () => {
			//data.subscription.unsubscribe()
		};
	});
</script>

<div class={fullWindow}>
	<Toaster containerClassName="flex flex-col flex-reverse" position="bottom-center" />
	<slot />
</div>
