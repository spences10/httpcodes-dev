<script lang="ts">
	import { classes, search_codes } from '#lib/data/codes.js';
	import { group_by_class } from '#lib/data/groups.js';
	import { class_bg, class_hover_bg, focus_ring } from './styles.js';

	let query = $state('');
	let results = $derived(search_codes(query));
	let groups = $derived(group_by_class(results));
</script>

<h1
	class="mt-10 max-w-4xl text-4xl leading-[0.95] font-black [font-stretch:125%] sm:text-6xl"
>
	What the server is actually telling you
</h1>
<p class="mt-4 max-w-2xl text-lg font-medium">
	Every HTTP response starts with a three-digit status code. The first
	digit is all you need to know who to blame.
</p>

<ul class="mt-8 grid gap-3">
	{#each classes as status_class (status_class.digit)}
		<li>
			<a
				href="#class-{status_class.digit}"
				class="{class_bg[
					status_class.digit
				]} flex flex-wrap items-baseline gap-x-6 border-4 border-black px-4 py-3 shadow-hard hover:translate-x-2 hover:translate-y-2 hover:shadow-none motion-safe:transition-transform sm:px-6 {focus_ring}"
			>
				<span
					class="text-5xl font-black [font-stretch:125%] sm:text-7xl"
					>{status_class.label}</span
				>
				<span
					class="w-full text-3xl font-black [font-stretch:125%] sm:w-auto sm:text-6xl"
					>{status_class.blunt}</span
				>
				<span class="ml-auto text-lg font-bold"
					>{status_class.name}</span
				>
			</a>
		</li>
	{/each}
</ul>

<div class="sticky top-0 z-10 -mx-4 mt-12 bg-white px-4 py-3">
	<label class="block text-lg font-bold" for="search">
		Search by number, name or insult
	</label>
	<input
		id="search"
		type="search"
		autocomplete="off"
		spellcheck="false"
		placeholder="404, teapot, redirect, 5xx"
		bind:value={query}
		class="mt-2 w-full border-4 border-black bg-white px-4 py-3 text-2xl font-bold shadow-hard-sm placeholder:text-neutral-500 focus:outline-4 focus:outline-offset-4 focus:outline-black"
	/>
</div>

<p class="mt-2 font-bold" aria-live="polite">
	{#if query.trim()}
		{results.length}
		{results.length === 1 ? 'code matches' : 'codes match'}
	{/if}
</p>

{#if results.length === 0}
	<p
		class="mt-8 max-w-xl border-4 border-black p-6 text-2xl font-bold"
	>
		Nothing matches “{query.trim()}”. Try a number like 404, a class
		like 4xx, or a word like redirect.
	</p>
{/if}

{#each groups as group (group.class.digit)}
	<section
		class="mt-12 scroll-mt-32"
		id="class-{group.class.digit}"
		aria-labelledby="class-{group.class.digit}-title"
	>
		<h2
			id="class-{group.class.digit}-title"
			class="{class_bg[
				group.class.digit
			]} inline-block border-4 border-black px-4 py-1 text-3xl font-black [font-stretch:125%]"
		>
			{group.class.label}
			{group.class.blunt}
		</h2>
		<ul class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each group.items as item (item.code)}
				<li class="flex">
					<a
						href="/{item.code}"
						class="{class_hover_bg[
							item.class
						]} flex w-full flex-col border-4 border-black bg-white p-4 {focus_ring}"
					>
						<span class="flex items-baseline gap-3">
							<span
								class="text-5xl leading-none font-black [font-stretch:125%]"
								>{item.code}</span
							>
							<span class="font-bold">{item.message}</span>
						</span>
						<span class="mt-3 text-xl leading-snug font-extrabold"
							>{item.blunt}</span
						>
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/each}
