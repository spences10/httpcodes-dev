<script lang="ts">
	import { design_list, type Design } from '#lib/designs/index.js';

	let { current, pathname }: { current: Design; pathname: string } =
		$props();

	// The same page in another design: swap the URL prefix.
	let rest = $derived(
		current.base && pathname.startsWith(current.base)
			? pathname.slice(current.base.length) || '/'
			: pathname,
	);
</script>

<!-- Temporary: remove once a design is chosen. -->
<nav
	aria-label="Design preview"
	class="fixed right-3 bottom-3 z-50 flex items-center gap-1 rounded-full bg-black p-1 font-sans text-sm text-white shadow-lg"
>
	<span class="px-2">Design</span>
	{#each design_list as design (design.id)}
		<a
			href="{design.base}{rest === '/' && design.base ? '' : rest}"
			aria-current={design.id === current.id ? 'page' : undefined}
			data-sveltekit-noscroll
			class="rounded-full px-3 py-1 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white {design.id ===
			current.id
				? 'bg-white text-black'
				: 'hover:bg-white/20'}"
		>
			{design.name}
		</a>
	{/each}
</nav>
