<script lang="ts">
	export let data;

	import { mailStore } from '$stores/store';
	import { Input } from '@/components/ui/input';
	import * as Resizable from '@/components/ui/resizable';
	import { Separator } from '@/components/ui/select';
	import * as Tabs from '@/components/ui/tabs';
	import Search from 'lucide-svelte/icons/search';

	import { mails } from '$utils/data';
	import MailList from '@/components/custums/mail-list.svelte';
	import MailDisplay from '@/components/custums/mail-display.svelte';


	$: layout = data.layout ?? [265, 440, 655];
</script>

<Resizable.Pane defaultSize={layout[1]} minSize={30}>
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
<Resizable.Pane defaultSize={layout[2]}>
	<MailDisplay mail={mails.find((item) => item.id === $mailStore.selected) || null} />
</Resizable.Pane>
