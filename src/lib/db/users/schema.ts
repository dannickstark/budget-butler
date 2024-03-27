import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { zfd } from "zod-form-data";

export const users = sqliteTable('users', {
	id: text('id').primaryKey().unique(),
	name: text('name'),
	userName: text('user_name'),
	age: integer('age'),
	email: text('email').unique().notNull(),
	avatar: text('avatar'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	deletedAt: text('deleted_at')
});

// Schema for inserting a user - can be used to validate API requests
export const insertLocalUserSchema = createInsertSchema(users)
export const insertOnlineUserSchema = insertLocalUserSchema.pick({email: true}).merge(
	z.object({
		password: z.string().min(8)
	})
);

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

// Schema for updating a user
export const updateUserSchema = insertLocalUserSchema.partial();

export type NewOnlineUser = z.infer<typeof insertOnlineUserSchema>;
export type NewLocalUser = z.infer<typeof insertLocalUserSchema>;
export type User = z.infer<typeof selectUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export const insertOnlineUserFormSchema = zfd.formData(insertOnlineUserSchema);