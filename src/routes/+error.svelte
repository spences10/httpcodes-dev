<script lang="ts">
	import { page } from '$app/state';
	import { focus_ring, press } from '#lib/components/styles.js';
	import { get_code } from '#lib/data/codes.js';

	let item = $derived(get_code(page.status));
	let message = $derived(item?.message ?? page.error?.message);
</script>

<svelte:head>
	<title>{page.status} {message}</title>
</svelte:head>

<div
	class="mt-10 border-4 border-black bg-class-4 p-5 shadow-hard sm:p-8"
>
	<h1 class="flex flex-wrap items-baseline gap-x-6">
		<span
			class="text-[clamp(5rem,22vw,14rem)] leading-[0.8] font-black [font-stretch:125%]"
			>{page.status}</span
		>
		<span class="text-2xl font-black sm:text-4xl">{message}</span>
	</h1>
	<p
		class="mt-6 text-4xl leading-[0.95] font-black [font-stretch:125%] sm:text-6xl"
	>
		{item?.blunt ?? 'Something went wrong.'}
	</p>
	<a
		href="/"
		class="mt-8 inline-block border-4 border-black bg-white px-4 py-2 text-xl font-bold {press} {focus_ring}"
	>
		See every status code
	</a>
</div>
