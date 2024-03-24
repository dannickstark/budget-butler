import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageLoad } from "./$types.js";
import { notificationsFormSchema } from "@/components/custums/settings/notifications-form.svelte";

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(notificationsFormSchema)),
	};
};
