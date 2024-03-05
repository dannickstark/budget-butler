<script lang="ts">
	import { accounts, mails } from "$utils/data";
	import Mail from "$components/custums/mail.svelte"

	export let data;
</script>

<Mail
	{accounts}
	{mails}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>