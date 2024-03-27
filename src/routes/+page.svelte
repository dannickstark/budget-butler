<script lang="ts">
	export let data;

	import '$lib/styles/app.css';
	import { migrate } from '$lib/db/migrate';
	import { onMount } from 'svelte';
	import { fullWindow } from '$lib/utils/tailwindGroups';
	import { Toaster } from 'svelte-french-toast';
	import SplashScreen from '@/components/custums/SplashScreen.svelte';
	import { goto } from '$app/navigation';
	import { session } from '$stores/auth.js';
	import { redirectUI } from '@/utils/routing.js';

	let hasMounted = false;
	let timeOut = undefined;
	let splashDelay = 3000;
	let splashDelayPassed = false;

	$: if (hasMounted && splashDelayPassed) {
		redirectUI("/", $session, data.introShowed)
	}

	onMount(async () => {
		timeOut = setTimeout(() => {
			splashDelayPassed = true;
		}, splashDelay);

		try {
			await migrate();
			console.info('Migration done!')

			hasMounted = true;
		} catch (error) {
			console.error('Migration error : ', error);
		}

		/* return () => {
			data.subscription.unsubscribe()
		}; */
	});
</script>

<div class={fullWindow}>
	<Toaster containerClassName="flex flex-col flex-reverse" position="bottom-center" />
	<SplashScreen></SplashScreen>
</div>
