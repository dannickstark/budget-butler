<script lang="ts">
	export let data;

	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { session } from '$stores/auth.js';
	import { primaryRoutes, secondaryRoutes } from '$utils/config';
	import { cn } from '@/utils';
	import * as Resizable from '@/components/ui/resizable';
	import { Separator } from '@/components/ui/select';
	import type { Account, Mail } from '$utils/data';
	import Cookies from 'js-cookie';
	import AccountSwitcher from '@/components/custums/account-switcher.svelte';
	import Nav from '@/components/custums/nav.svelte';
	import { accounts, mails } from '$utils/data';

	let navCollapsedSize: 4;

	$: isCollapsed = data.collapsed ?? false;
	$: layout = data.layout ?? [265, 440, 655];

	function onLayoutChange(sizes: number[]) {
		Cookies.set('PaneForge:layout', sizes.join(','));
	}

	function onCollapse() {
		isCollapsed = true;
		Cookies.set('PaneForge:collapsed', 'true');
	}

	function onExpand() {
		isCollapsed = false;
		Cookies.set('PaneForge:collapsed', 'false');
	}

	onMount(() => {
		if ($session == undefined) {
			redirect(303, '/');
		}
	});
</script>

<div class="w-screen h-screen overflow-hidden">
	<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="items-stretch h-full">
		<Resizable.Pane
			defaultSize={layout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={15}
			maxSize={20}
			{onCollapse}
			{onExpand}
		>
			<div
				class={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}
			>
				<AccountSwitcher {isCollapsed} {accounts} />
			</div>
			<Separator />
			<Nav {isCollapsed} routes={primaryRoutes} />
			<Separator />
			<Nav {isCollapsed} routes={secondaryRoutes} />
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<slot />
	</Resizable.PaneGroup>
</div>
