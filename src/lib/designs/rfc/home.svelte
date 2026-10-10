<script lang="ts">
	import { classes, search_codes } from '#lib/data/codes.js';
	import { group_by_class } from '#lib/data/groups.js';
	import { indent, link } from './styles.js';

	let { base }: { base: string } = $props();

	let query = $state('');
	let results = $derived(search_codes(query));
	let groups = $derived(group_by_class(results));
</script>

<div class="flex flex-wrap justify-between gap-x-[4ch]">
	<p>
		Network Working Group<br />
		Request for Comments: 9110, more or less<br />
		Category: Informational
	</p>
	<p class="sm:text-right">
		httpcodes.dev<br />
		Obsoletes: polite explanations
	</p>
</div>

<h1 class="mt-10 text-center font-bold">
	HTTP Status Codes: What the Server Actually Means
</h1>

<h2 class="mt-10 font-bold">Abstract</h2>
<p class="mt-4 {indent}">
	A server answers every request with a three-digit status code. This
	memo records what each code means in the words the server would use
	if it were being honest. The proper definitions are included for
	people who need them.
</p>

<h2 class="mt-8 font-bold">1.&nbsp; The Five Classes</h2>
<p class="mt-4 {indent}">
	The first digit says who is at fault. Nothing else is required to
	understand most responses.
</p>
<table class="mt-4 ml-[6ch]">
	<tbody>
		{#each classes as status_class (status_class.digit)}
			<tr>
				<th scope="row" class="pr-[3ch] text-left font-bold">
					<a class={link} href="#class-{status_class.digit}"
						>{status_class.label}</a
					>
				</th>
				<td class="pr-[3ch] font-bold">{status_class.blunt}</td>
				<td class="text-rfc-dim">{status_class.name}</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2 class="mt-8 font-bold">2.&nbsp; Finding a Code</h2>
<div class="mt-4 {indent}">
	<label for="rfc-search">
		Search by number, name or insult. A class such as 4xx also works.
	</label>
	<div class="mt-2 flex items-baseline gap-[1ch]">
		<span aria-hidden="true">$ grep -i</span>
		<input
			id="rfc-search"
			type="search"
			autocomplete="off"
			spellcheck="false"
			placeholder="teapot"
			bind:value={query}
			class="min-w-0 flex-1 border-b border-black bg-white px-[1ch] font-rfc placeholder:text-rfc-dim focus:bg-yellow-100 focus:outline-none"
		/>
	</div>
	<p class="mt-2" aria-live="polite">
		{#if query.trim()}
			{results.length}
			{results.length === 1 ? 'code matches' : 'codes match'}.
		{/if}
	</p>
	{#if results.length === 0}
		<p class="mt-2">
			Nothing matches "{query.trim()}". Try a number such as 404, a
			class such as 4xx, or a word such as redirect.
		</p>
	{/if}
</div>

<h2 class="mt-8 font-bold">3.&nbsp; The Codes</h2>
{#each groups as group (group.class.digit)}
	<section
		id="class-{group.class.digit}"
		class="scroll-mt-4"
		aria-labelledby="class-{group.class.digit}-title"
	>
		<h3 id="class-{group.class.digit}-title" class="mt-6 font-bold">
			3.{group.class.digit}.&nbsp; {group.class.label}
			{group.class.name}: {group.class.blunt}
		</h3>
		<ul class="mt-4 {indent}">
			{#each group.items as item (item.code)}
				<li class="flex flex-wrap items-baseline gap-x-[1ch]">
					<a class="{link} shrink-0" href="{base}/{item.code}"
						>{item.code} {item.message}</a
					>
					<span
						aria-hidden="true"
						class="hidden min-w-[3ch] flex-1 translate-y-[-0.25em] border-b border-dotted border-black sm:block"
					></span>
					<span class="pl-[4ch] sm:pl-0">{item.blunt}</span>
				</li>
			{/each}
		</ul>
	</section>
{/each}

<p class="mt-10 text-right text-rfc-dim">[Page 1]</p>
