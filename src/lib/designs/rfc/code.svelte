<script lang="ts">
	import CopyButton from '#lib/components/copy-button.svelte';
	import {
		get_class,
		get_code,
		type StatusCode,
	} from '#lib/data/codes.js';
	import { get_confusions } from '#lib/data/confusions.js';
	import { curl_command, get_neighbours } from '#lib/data/groups.js';
	import { get_spec } from '#lib/data/specs.js';
	import { SITE_URL } from '#lib/site.js';
	import { indent, link, text_button } from './styles.js';

	let { base, item }: { base: string; item: StatusCode } = $props();

	let status_class = $derived(get_class(item.class));
	let spec = $derived(get_spec(item.code));
	let confusions = $derived(get_confusions(item.code));
	let neighbours = $derived(get_neighbours(item.code));
	let curl = $derived(curl_command(SITE_URL, item.code));
	// Codes from RFC 9110 keep their real section number.
	let number = $derived(
		spec?.section ?? `${item.class}.${item.code}`,
	);
</script>

<article>
	<h1 class="font-bold">
		{number}.&nbsp; {item.code}
		{item.message}
	</h1>

	<p class="mt-4 font-bold {indent}">{item.blunt}</p>

	<p class="mt-4 {indent}">{item.detail}</p>

	<dl class="mt-4 grid grid-cols-[auto_1fr] gap-x-[2ch] {indent}">
		<dt>Class:</dt>
		<dd>
			{status_class.label}
			{status_class.name} ({status_class.blunt})
		</dd>
		{#if spec}
			<dt>Defined in:</dt>
			<dd>
				<a class={link} href={spec.url}>
					RFC {spec.rfc}{spec.section
						? `, Section ${spec.section}`
						: ''}
				</a>
			</dd>
		{/if}
		{#if item.tags}
			<dt>Notes:</dt>
			<dd>{item.tags.join(', ')}</dd>
		{/if}
	</dl>

	<section aria-labelledby="try-title">
		<h2 id="try-title" class="mt-8 font-bold">
			{number}.1.&nbsp; Example
		</h2>
		<p class="mt-4 {indent}">
			The following endpoint really answers with {item.code}.
		</p>
		<pre
			class="mt-4 ml-[6ch] overflow-x-auto font-rfc break-all whitespace-pre-wrap">$ {curl}
HTTP/1.1 {item.code} {item.message}
x-translation: {item.blunt}</pre>
		<p class="mt-4 {indent}">
			<CopyButton
				text={curl}
				label="Copy curl command"
				class={text_button}
			>
				{#snippet children(copied: boolean)}
					[{copied ? 'Copied' : 'Copy command'}]
				{/snippet}
			</CopyButton>
		</p>
	</section>

	{#if confusions.length > 0}
		<section aria-labelledby="confused-title">
			<h2 id="confused-title" class="mt-8 font-bold">
				{number}.2.&nbsp; Not to Be Confused With
			</h2>
			{#each confusions as confusion (confusion.question)}
				<h3 class="mt-4 {indent}">
					{#each confusion.codes.filter((code) => code !== item.code) as code, index (code)}
						{@const other = get_code(code)!}
						{index > 0 ? ' and ' : ''}<a
							class={link}
							href="{base}/{code}">{code} {other.message}</a
						>{/each}. {confusion.question}
				</h3>
				<p class="mt-2 pl-[6ch]">{confusion.answer}</p>
			{/each}
		</section>
	{/if}

	<nav
		aria-label="Other codes"
		class="mt-10 flex flex-wrap justify-between gap-x-[4ch] gap-y-1"
	>
		{#if neighbours.previous}
			<a class={link} href="{base}/{neighbours.previous.code}"
				>Previous: {neighbours.previous.code}
				{neighbours.previous.message}</a
			>
		{/if}
		<a class={link} href="{base}/">Contents</a>
		{#if neighbours.next}
			<a class={link} href="{base}/{neighbours.next.code}"
				>Next: {neighbours.next.code}
				{neighbours.next.message}</a
			>
		{/if}
	</nav>

	<p class="mt-10 text-right text-rfc-dim">[Page {item.code}]</p>
</article>
