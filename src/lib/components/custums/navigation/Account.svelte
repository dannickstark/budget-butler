<script lang="ts">
	import type { User } from '@/db/users/schema';
	import UserNav from './UserNav.svelte';

	export let isCollapsed: boolean;
	export let user: User;
</script>

<div class="flex flex-row items-center w-full space-x-4">
	<UserNav {user}></UserNav>
	{#if !isCollapsed}
		<div class="flex flex-col flex-1 text-nowrap">
			{#if user.name}
				<span class="text-sm font-medium leading-none">
					{user.name}
				</span>
			{/if}
			<span class="text-sm text-muted-foreground">
				{user.email}
			</span>
		</div>
	{/if}
</div>
