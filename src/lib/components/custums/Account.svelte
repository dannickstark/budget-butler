<script lang="ts">
	import type { User } from '@/db/users/schema';
	import UserNav from './navigation/UserNav.svelte';

	export let isCollapsed: boolean;
	export let user: User;
</script>

<div class="flex items-center justify-between space-x-4">
	<UserNav {user}></UserNav>
	{#if !isCollapsed}
		<div class="flex flex-col">
			{#if user.name}
				<p class="text-sm font-medium leading-none">
					{user.name}
				</p>
			{/if}
			<p class="text-sm text-muted-foreground">
				{user.email}
			</p>
		</div>
	{/if}
</div>
