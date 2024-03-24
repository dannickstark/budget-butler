<script lang="ts">
	export let data;

	import { Separator } from '@/components/ui/select';
	import ProfileForm from '@/components/custums/settings/profile-form.svelte';
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
	</div>
	<Separator />
	<ProfileForm data={data.form} />
</div>
