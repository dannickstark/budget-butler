import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { displayFormSchema } from "@/components/custums/settings/display-form.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(displayFormSchema)),
	};
};
