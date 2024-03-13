<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Resource, invoke } from '@tauri-apps/api/core';
	import { onMount } from 'svelte';

	let name = '';
	let greetMsg = '';

	async function greet() {
		greetMsg = await invoke('greet', { name });
	}
</script>

<Button on:click={greet}>Greet me</Button>
<h1 class="text-3xl font-bold underline">
	{greetMsg}
</h1>
