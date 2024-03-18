<script lang="ts">
	export let data;

	import { accounts, mails } from '$utils/data';
	import Mail from '$components/custums/mail.svelte';
</script>

<Mail
	{accounts}
	{mails}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>
