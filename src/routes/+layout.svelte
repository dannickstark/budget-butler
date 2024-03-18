<script>
	import '../app.css';
	import {migrate} from '$lib/db/migrate'
	import { onMount } from 'svelte';

	onMount(async () => {
		await migrate();
	})
</script>

<slot />
