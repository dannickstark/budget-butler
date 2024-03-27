<script lang="ts">
	export let data;

	import { onMount } from 'svelte';
	import { session, user } from '$stores/auth.js';
	import { primaryRoutes, secondaryRoutes, servicesRoutes } from '@/utils/routes.js';
	import { cn } from '@/utils';
	import * as Resizable from '@/components/ui/resizable';
	import { Separator } from '@/components/ui/select';
	import Cookies from 'js-cookie';
	import Nav from '@/components/custums/navigation/nav.svelte';
	import { redirectUI } from '@/utils/routing.js';
	import { supabase } from '@/auth/supabaseClient.js';
	import Account from '@/components/custums/Account.svelte';
	import { getUserByID } from '@/db/users/handler.js';
	import toast from 'svelte-french-toast';
	import { createNewUserFromProvider, localLogOut } from '@/auth/login-signin.js';

	let navCollapsedSize: number = 4;
	let mounted: boolean = false;

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

			if (resSession) $session = resSession;
		}

		if ($session) {
			let { user: userData } = $session;
			let dbUser = await getUserByID(userData.id);

			if (dbUser) {
				$user = dbUser;
			} else {
				let newUser = await createNewUserFromProvider(userData);

				if (newUser == undefined) {
					toast.error('Unable to create a new user');
					await localLogOut();
				} else {
					$user = newUser;
				}
			}
		}

		redirectUI('/app', $session, data.introShowed);
		//console.log('layout loaded : app : ', $session);
		mounted = true;
	});
</script>

{#if mounted}
	{#if $user}
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
								<Account {isCollapsed} user={$user} />
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
	{/if}
{/if}
