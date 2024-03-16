<script lang="ts">
	export let data;

	import { accounts, mails } from '$utils/data';
	import Mail from '$components/custums/mail.svelte';
	import { Button } from '@/components/ui/button';
	import { Resource, invoke } from '@tauri-apps/api/core';
	import { onMount } from 'svelte';

	import Database from '@tauri-apps/plugin-sql';
	import { appLocalDataDir } from '@tauri-apps/api/path';

	async function getDBPath(){
		const appLocalDataDirPath = await appLocalDataDir();
		return `${appLocalDataDirPath}/database.db`
	}

	async function loadDB(){
		return await Database.load('sqlite:database.db');
	}

	async function get_todos() {
		const db = await loadDB();

		// INSERT and UPDATE examples for sqlite and postgres
		const results = await db.execute('SELECT * FROM todos');
		console.log("----------> results", results)
	}

	async function create_todo() {
		const db = await loadDB();

		let todos = {
			id: "qwqwqwe",
			title: "todo 1",
			status: "active"
		}

		// INSERT and UPDATE examples for sqlite and postgres
		const result = await db.execute('INSERT into todos (id, title, status) VALUES ($1, $2, $3)', [
			todos.id,
			todos.title,
			todos.status
		]);
	}
</script>

<Button on:click={get_todos}>Get todos</Button>
<Button on:click={create_todo}>Create todo</Button>
<Mail
	{accounts}
	{mails}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>
