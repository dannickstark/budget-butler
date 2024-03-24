<script lang="ts">
	export let data;

	import { Separator } from "@/components/ui/separator/index.js";
	import AppearanceForm from "@/components/custums/settings/appearance-form.svelte";
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Appearance</h3>
		<p class="text-sm text-muted-foreground">
			Customize the appearance of the app. Automatically switch between day and night themes.
		</p>
	</div>
	<Separator />
	<AppearanceForm data={data.form} />
</div>
