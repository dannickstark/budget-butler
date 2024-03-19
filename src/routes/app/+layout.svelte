<script lang="ts">
	export let data;

	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { session } from '$stores/auth.js';
	
	onMount(() => {
		if($session == undefined){
			redirect(303, '/');
		}
	});
</script>

<slot></slot>