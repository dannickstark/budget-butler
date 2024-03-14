<script lang="ts">
	export let data;

	import { accounts, mails } from '$utils/data';
	import Mail from '$components/custums/mail.svelte';
	import { Button } from '@/components/ui/button';
	import { Resource, invoke } from '@tauri-apps/api/core';
	import { onMount } from 'svelte';

	let person: any = undefined;

	async function get_persons() {
		console.log('---------> get_persons');
		let id = '';
		person = await invoke('get_persons', { id });
		console.log('--------->', person);
	}

	async function create_person() {
		console.log('---------> create_person');
		let name = 'dannick';
		person = await invoke('create_person', { name });
		console.log('--------->', person);
	}
</script>

<Button on:click={get_persons}>Get persons</Button>
<Button on:click={create_person}>Create person</Button>
<Mail
	{accounts}
	{mails}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>
