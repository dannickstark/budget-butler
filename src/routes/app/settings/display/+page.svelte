<script lang="ts">
	export let data;

	import { Separator } from "@/components/ui/separator/index.js";
	import DisplayForm from "@/components/custums/settings/display-form.svelte";
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Display</h3>
		<p class="text-sm text-muted-foreground">
			Turn items on or off to control what's displayed in the app.
		</p>
	</div>
	<Separator />
	<DisplayForm data={data.form} />
</div>
