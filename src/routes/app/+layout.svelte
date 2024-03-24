<script lang="ts">
	export let data;

	import { onMount } from 'svelte';
	import { session } from '$stores/auth.js';
	import { primaryRoutes, secondaryRoutes, servicesRoutes } from '@/utils/routes.js';
	import { cn } from '@/utils';
	import * as Resizable from '@/components/ui/resizable';
	import { Separator } from '@/components/ui/select';
	import Cookies from 'js-cookie';
	import Nav from '@/components/custums/nav.svelte';
	import { redirectUI } from '@/utils/routing.js';
	import { supabase } from '@/auth/supabaseClient.js';
	import Button from '@/components/ui/button/button.svelte';
	import type { User } from '@/utils/types.js';
	import Account from '@/components/custums/Account.svelte';

	let navCollapsedSize: number = 4;
	let mounted: boolean = false;

	let user: User = {
		name: 'Olivia Martin',
		email: 'm@example.com',
		avatar: undefined
	};

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

	onMount(async () => {
		if ($session == undefined) {
			let {
				data: { session: resSession }
			} = await supabase.auth.getSession();
			resSession && ($session = resSession);
		}

		redirectUI('/app', $session, data.introShowed);
		console.log('layout loaded : app : ', data);
		mounted = true;
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
			<div class="flex flex-col justify-between h-full">
				<div class="flex flex-col">
					<div
						class={cn(
							'flex h-[52px] items-center',
							isCollapsed ? 'h-[52px] justify-center' : 'px-2'
						)}
					>
						<Account {isCollapsed} {user} />
					</div>
					<Separator />
					<Nav {isCollapsed} routes={primaryRoutes} />
					<Separator />
					<Nav {isCollapsed} routes={secondaryRoutes} />
				</div>

				<div class="flex flex-col">
					<Nav {isCollapsed} routes={servicesRoutes} />
				</div>
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<slot />
	</Resizable.PaneGroup>
</div>
