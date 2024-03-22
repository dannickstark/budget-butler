<script lang="ts">
	import Logo from '@/components/Logo.svelte';
	import { fullElement } from '@/utils/tailwindGroups.js';
	import { twMerge } from 'tailwind-merge';
	import Reload from 'svelte-radix/Reload.svelte';

	let centeredFull = twMerge(fullElement, 'flex flex-row items-center justify-center');
</script>

<div class={centeredFull}>
	<div class="flex flex-col space-y-5">
		<div class="flex flex-col items-center space-y-4">
			<Logo size='XL'></Logo>
			<span class="text-2xl subpixel-antialiased font-bold leading-tight tracking-tight md:tracking-wide">Budget Butler</span>
		</div>
	</div>
	<Reload class="absolute w-8 h-8 animate-spin bottom-8 left-1/2" />
</div>
