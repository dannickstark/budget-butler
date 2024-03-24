import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageLoad } from "../display/$types.js";
import { appearanceFormSchema } from "@/components/custums/settings/appearance-form.svelte";

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(appearanceFormSchema)),
	};
};
