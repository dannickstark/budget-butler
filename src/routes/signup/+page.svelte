<script lang="ts">
	export let data;
	import { goto } from '$app/navigation';
	import { session } from '$stores/auth.js';

	import Logo from '@/components/Logo.svelte';
	import SignupCard from '@/components/auth/SignupCard.svelte';
	import { fullElement } from '@/utils/tailwindGroups.js';
	import { twMerge } from 'tailwind-merge';

	let centeredFull = twMerge(fullElement, 'flex flex-row items-center justify-center');

	$: if ($session) {
		goto('/app');
	}

	function redirectPage(event: { detail: { path: any; }; }){
		let path = event.detail.path
		if(path){
			goto(path)
		}
	}
</script>

<div class={centeredFull}>
	<div class="flex flex-col space-y-5">
		<div class="flex flex-col items-center">
			<Logo></Logo>
			<span class="text-xl font-bold">Budget Butler</span>
		</div>
		<SignupCard on:redirect={redirectPage}></SignupCard>
	</div>
</div>
