<script lang="ts">
	import { classes, search_codes } from '#lib/data/codes.js';
	import { group_by_class } from '#lib/data/groups.js';
	import Plate from './plate.svelte';
	import { white_sign } from './styles.js';

	let { base }: { base: string } = $props();

	let query = $state('');
	let results = $derived(search_codes(query));
	let groups = $derived(group_by_class(results));
</script>

<h1
	class="mt-8 text-5xl leading-none font-black tracking-tight sm:text-7xl"
>
	Read the signs
</h1>
<p class="mt-4 max-w-2xl text-xl">
	Every HTTP response starts with a three-digit status code. The first
	digit tells you which way things went.
</p>

<ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
	{#each classes as status_class (status_class.digit)}
		<li class="flex">
			<div class="w-full">
				<Plate
					digit={status_class.digit}
					href="#class-{status_class.digit}"
					class="px-4 pt-4 pb-3"
				>
					<span class="block text-5xl leading-none font-black"
						>{status_class.label}</span
					>
					<span
						class="mt-3 block text-2xl leading-tight font-extrabold"
						>{status_class.blunt}</span
					>
					<span class="mt-1 block text-base font-semibold"
						>{status_class.name}</span
					>
				</Plate>
			</div>
		</li>
	{/each}
</ul>

<div class="mt-12">
	<label class="block text-lg font-bold" for="signs-search">
		Search by number, name or insult
	</label>
	<input
		id="signs-search"
		type="search"
		autocomplete="off"
		spellcheck="false"
		placeholder="404, teapot, redirect, 5xx"
		bind:value={query}
		class="{white_sign} mt-2 w-full px-4 pt-3 pb-2 text-2xl font-bold placeholder:font-semibold placeholder:text-neutral-500 focus:outline-4 focus:outline-offset-4 focus:outline-black"
	/>
</div>

<p class="mt-3 font-bold" aria-live="polite">
	{#if query.trim()}
		{results.length}
		{results.length === 1 ? 'code matches' : 'codes match'}
	{/if}
</p>

{#if results.length === 0}
	<p class="{white_sign} mt-6 max-w-xl p-5 text-xl font-bold">
		Nothing matches “{query.trim()}”. Try a number like 404, a class
		like 4xx, or a word like redirect.
	</p>
{/if}

{#each groups as group (group.class.digit)}
	<section
		class="mt-12 scroll-mt-6"
		id="class-{group.class.digit}"
		aria-labelledby="class-{group.class.digit}-title"
	>
		<h2
			id="class-{group.class.digit}-title"
			class="text-3xl font-black tracking-tight"
		>
			{group.class.label}
			{group.class.blunt}
		</h2>
		<p class="text-lg font-semibold">{group.class.name}</p>
		<ul class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each group.items as item (item.code)}
				<li class="flex">
					<div class="w-full">
						<Plate
							digit={item.class}
							href="{base}/{item.code}"
							class="flex h-full items-start gap-3 p-3"
						>
							<span
								class="shrink-0 rounded-md border-2 border-black bg-white px-2 pt-1 text-3xl leading-none font-black text-black"
								>{item.code}</span
							>
							<span class="block">
								<span class="block text-sm font-semibold"
									>{item.message}</span
								>
								<span
									class="block text-xl leading-tight font-extrabold"
									>{item.blunt}</span
								>
							</span>
						</Plate>
					</div>
				</li>
			{/each}
		</ul>
	</section>
{/each}
