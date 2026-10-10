<script lang="ts">
	import { page } from '$app/state';
	import '@fontsource-variable/archivo/standard.css';
	import { get_code } from '#lib/data/codes.js';

	let item = $derived(get_code(page.status));
</script>

<svelte:head>
	<title>{page.status} {item?.message ?? page.error?.message}</title>
</svelte:head>

<main
	class="flex min-h-screen flex-col justify-center bg-brut-4 px-4 py-10 font-brut text-black"
>
	<div class="mx-auto w-full max-w-4xl">
		<h1 class="flex flex-wrap items-baseline gap-x-6">
			<span
				class="text-[clamp(5rem,22vw,14rem)] leading-[0.8] font-black [font-stretch:125%]"
				>{page.status}</span
			>
			<span class="text-2xl font-black sm:text-4xl"
				>{item?.message ?? page.error?.message}</span
			>
		</h1>
		<p
			class="mt-6 text-4xl leading-[0.95] font-black [font-stretch:125%] sm:text-6xl"
		>
			{item?.blunt ?? 'Something went wrong.'}
		</p>
		<p class="mt-8 text-xl font-bold">
			<a
				href="/"
				class="inline-block border-4 border-black bg-white px-4 py-2 shadow-brut-sm focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black"
			>
				See every status code
			</a>
		</p>
	</div>
</main>
