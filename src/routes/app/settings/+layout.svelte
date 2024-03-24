<script lang="ts">
	export let data;

	import SidebarNav from '@/components/custums/settings/SidebarNav.svelte';
	import { Separator } from '@/components/ui/separator';
	import * as Resizable from '@/components/ui/resizable';
	import { ScrollArea } from '@/components/ui/scroll-area/index.js';

	let basePath = '/app/settings';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: `${basePath}`
		},
		{
			title: 'Account',
			href: `${basePath}/account`
		},
		{
			title: 'Appearance',
			href: `${basePath}/appearance`
		},
		{
			title: 'Notifications',
			href: `${basePath}/notifications`
		},
		{
			title: 'Display',
			href: `${basePath}/display`
		}
	];

	$: layout = data.layout ?? [265, 440, 655];
</script>

<Resizable.Pane defaultSize={layout[1]} minSize={30}>
	<div class="flex flex-col h-full p-10 space-y-6">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
			<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
		</div>
		<Separator class="my-6" />
		<div class="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
			<aside class="-mx-4 lg:w-1/5">
				<SidebarNav items={sidebarNavItems} />
			</aside>
			<div class="relative flex-1 w-full lg:h-full">
				<ScrollArea class="absolute w-full h-full border rounded-md" orientation="vertical">
					<slot />
				</ScrollArea>
			</div>
		</div>
	</div>
</Resizable.Pane>
