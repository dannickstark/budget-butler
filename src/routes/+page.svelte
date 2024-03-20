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
	import { invalidate } from '$app/navigation';

	let centeredFull = twMerge(fullElement, 'flex flex-row items-center justify-center');

	onMount(() => {
		if ($session) {
			goto('/app');
		} else {
			goto('/signup');
		}
	});


</script>

<div class={centeredFull}>
	
</div>
