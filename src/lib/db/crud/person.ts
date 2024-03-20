import { db } from '$lib/db/database';
import * as schema from '$lib/db/schema';

export async function getUsers() {
    let users = await db.query.users.findMany();
    return users
}

export async function createUser() {
    let name = 'Dannick ' + Math.random();
    await db.insert(schema.users).values({ name });
}