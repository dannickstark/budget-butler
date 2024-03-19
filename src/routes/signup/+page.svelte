<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$stores/auth.js';
	import { supabase } from '@/auth/supabaseClient.js';

	export let data;

	import Logo from '@/components/Logo.svelte';
	import SignupCard from '@/components/auth/SignupCard.svelte';
	import { fullElement } from '@/utils/tailwindGroups.js';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let centeredFull = twMerge(fullElement, 'flex flex-row items-center justify-center');

	onMount(async () => {
		let { data } = await supabase.auth.getSession();

		if (data.session) {
			$session = data.session;
			goto('/app');
		}
	});
</script>

<div class={centeredFull}>
	<div class="flex flex-col space-y-5">
		<div class="flex flex-col items-center">
			<Logo></Logo>
			<span class="text-xl font-bold">Budget Butler</span>
		</div>
		<SignupCard></SignupCard>
	</div>
</div>
