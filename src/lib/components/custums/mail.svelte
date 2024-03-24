<script lang="ts">
	import AccountSwitcher from "./account-switcher.svelte";
	import { primaryRoutes, secondaryRoutes } from "@/utils/routes";
	import MailDisplay from "./mail-display.svelte";
	import MailList from "./mail-list.svelte";
	import Nav from "./nav.svelte";
	import { mailStore } from "$stores/store";
	import { cn } from "@/utils";
	import { Input } from "@/components/ui/input";
	import * as Resizable from "@/components/ui/resizable";
	import { Separator } from "@/components/ui/select";
	import * as Tabs from "@/components/ui/tabs";
	import Search from "lucide-svelte/icons/search";
	import type { Account, Mail } from "$utils/data";
	import Cookies from 'js-cookie'

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [265, 440, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	let isCollapsed = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		Cookies.set('PaneForge:layout', sizes.join(','))
	}

	function onCollapse() {
		isCollapsed = true;
		Cookies.set('PaneForge:collapsed', 'true')
	}

	function onExpand() {
		isCollapsed = false;
		Cookies.set('PaneForge:collapsed', 'false')
	}
</script>

<div class="w-screen h-screen overflow-hidden ">
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="items-stretch h-full"
	>
		<Resizable.Pane
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={15}
			maxSize={20}
			{onCollapse}
			{onExpand}
		>
			<div
				class={cn(
					"flex h-[52px] items-center justify-center",
					isCollapsed ? "h-[52px]" : "px-2"
				)}
			>
				<AccountSwitcher {isCollapsed} {accounts} />
			</div>
			<Separator />
			<Nav {isCollapsed} routes={primaryRoutes} />
			<Separator />
			<Nav {isCollapsed} routes={secondaryRoutes} />
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
			<Tabs.Root value="all" class="flex flex-col h-full">
				<div class="flex items-center px-4 py-2">
					<h1 class="text-xl font-bold">Inbox</h1>
					<Tabs.List class="ml-auto">
						<Tabs.Trigger value="all" class="text-zinc-600 dark:text-zinc-200">
							All mail
						</Tabs.Trigger>
						<Tabs.Trigger value="unread" class="text-zinc-600 dark:text-zinc-200">
							Unread
						</Tabs.Trigger>
					</Tabs.List>
				</div>
				<Separator />
				<div
					class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
				>
					<form>
						<div class="relative">
							<Search class="absolute w-4 h-4 left-2 top-3 text-muted-foreground" />
							<Input placeholder="Search" class="pl-8" />
						</div>
					</form>
				</div>
				<Tabs.Content value="all" class="m-0 overflow-y-auto">
					<MailList items={mails} />
				</Tabs.Content>
				<Tabs.Content value="unread" class="m-0 overflow-y-auto">
					<MailList items={mails.filter((item) => !item.read)} />
				</Tabs.Content>
			</Tabs.Root>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[2]}>
			<MailDisplay mail={mails.find((item) => item.id === $mailStore.selected) || null} />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>