import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageLoad } from "./$types.js";
import { insertOnlineUserSchema } from "@/db/users/schema.js";

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(insertOnlineUserSchema)),
	};
};
