import type { PageLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { profileFormSchema } from "@/components/custums/settings/profile-form.svelte";

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(profileFormSchema)),
	};
};
