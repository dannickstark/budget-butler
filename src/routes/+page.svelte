<script lang="ts">;
	export let data;

	import { Button } from '@/components/ui/button';

	import { db } from '$lib/db/database';
	import * as schema from '$lib/db/schema';

	async function getUsers() {
		//let users = await db.query.users.findMany();
        let users = await db.select().from(schema.users);

		console.log('🚀 ~ FindMany response from Drizzle:', users);
	}

	async function createUser() {
		let name = 'Dannick ' + Math.random();
		await db.insert(schema.users).values({ name });
	}
</script>

<Button on:click={getUsers}>Get users</Button>
<Button on:click={createUser}>Create user</Button>
