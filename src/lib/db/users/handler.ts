import { db } from '$lib/db/database';
import * as schemas from '@/db/schemas';
import { eq } from 'drizzle-orm';
import type { NewLocalUser, UpdateUser, User } from './schema';

// A function to get all users from the database. Returns an array of users.
export async function getUsers() {
	let users = await db.query.users.findMany();
	return users;
}

// A function to get a specific user with a specific id
export async function getUserByID(id: string) {
	return db.query.users.findFirst({ where: eq(schemas.users.id, id) });
}

// A function to get a specific user with a specific mail
export async function getUserByMail(email: string) {
	return db.query.users.findFirst({ where: eq(schemas.users.email, email) });
}

// A function to create a new user in the database. Returns the created user.
export async function createUser(user: NewLocalUser) {
	await db.insert(schemas.users).values(user);
	return await getUserByID(user.id)
}

// A function to delete a user with a specific id
export async function deleteUser(id: string) {
	await db.delete(schemas.users).where(eq(schemas.users.id, id));
}

// A function to update a user with a specific id
export async function updateUser(id: string, user: UpdateUser) {
	await db.update(schemas.users).set(user).where(eq(schemas.users.id, id));
	return await getUserByID(id)
}
