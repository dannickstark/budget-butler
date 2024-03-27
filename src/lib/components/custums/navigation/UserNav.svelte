<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '../../ui/dropdown-menu';
	import { Button } from '../../ui/button';
	import type { User } from '@/db/users/schema';

	export let user: User

	$: names = user.name?.split(' ') ?? [];
	$: initials = (names.length == 0) ? user.email[0] + user.email[1] : names[0][0] + names[1][0];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative w-8 h-8 rounded-full">
			<Avatar.Root>
				<Avatar.Image src={user.avatar} />
				<Avatar.Fallback>{initials}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Billing
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>New Team</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Log out
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
