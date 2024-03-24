<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User } from '@/utils/types';
	import * as DropdownMenu from '../ui/dropdown-menu';
	import { Button } from '../ui/button';

	export let user: User;

	$: name = user.name.split(' ');
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative w-8 h-8 rounded-full">
		<Avatar.Root>
			<Avatar.Image src={user.avatar} />
			<Avatar.Fallback>{name[0][0] + name[1][0]}</Avatar.Fallback>
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