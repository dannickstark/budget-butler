<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User } from '@/utils/types';
	import UserNav from './UserNav.svelte';

	export let user: User;
	export let isCollapsed: boolean;

	$: name = user.name.split(' ');
</script>

<div class="flex items-center justify-between space-x-4">
		<UserNav {user}></UserNav>
		{#if !isCollapsed}
			<div class="flex flex-col">
				<p class="text-sm font-medium leading-none">
					{user.name}
				</p>
				<p class="text-sm text-muted-foreground">
					{user.email}
				</p>
			</div>
		{/if}
</div>
