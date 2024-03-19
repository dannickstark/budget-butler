<script lang="ts">
	export let hide: boolean = false;
	export let size: 'Big' | 'Small' = 'Big';
	export let theme: 'dynamic' | 'light' | 'dark' = 'dynamic';
	export let href: string = '/';
</script>

<a class="flex w-fit flex-row items-center gap-2 {$$props.class}" {href}>
	<img
		src="./favicon.png"
		class={`overflow-hidden rounded-md transition-all ${
			theme && theme == 'dark' ? 'hidden' : 'block dark:hidden'
		} ${hide ? 'w-0' : size == 'Big' ? 'w-20' : 'w-10'}`}
		alt="logo"
	/>
	<img
		src="./favicon.png"
		class={`overflow-hidden rounded-md transition-all ${
			theme && theme == 'dark' ? 'block' : 'hidden dark:block'
		} ${hide ? 'w-0' : size == 'Big' ? 'w-20' : 'w-10'}`}
		alt="logo"
	/>
</a>
