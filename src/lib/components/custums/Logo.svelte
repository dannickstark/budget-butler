<script lang="ts">
	export let hide: boolean = false;
	export let size: 'XL' | 'Big' | 'Small' = 'Big';
	export let theme: 'dynamic' | 'light' | 'dark' = 'dynamic';
	export let href: string | undefined = undefined;

	let width = (size == 'XL' ? 'w-44' : (size == 'Big' ? 'w-20' : 'w-10'))
	let rounded = (size == 'XL' ? 'rounded-3xl' : (size == 'Big' ? 'rounded-2xl' : 'rounded-md'))
	let classes = 'w-44 w-20 w-10 rounded-3xl rounded-2xl rounded-md'
</script>

<a class="flex w-fit flex-row items-center gap-2 shadow {rounded} {$$props.class}" {href}>
	<img
		src="./favicon.png"
		class={`overflow-hidden transition-all ${
			theme && theme == 'dark' ? 'hidden' : 'block dark:hidden'
		} ${hide ? 'w-0' : width}`}
		alt="logo"
	/>
	<img
		src="./favicon.png"
		class={`overflow-hidden transition-all ${
			theme && theme == 'dark' ? 'block' : 'hidden dark:block'
		} ${hide ? 'w-0' : width}`}
		alt="logo"
	/>
</a>
