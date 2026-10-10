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
	import { class_bg, focus_ring, press } from './styles.js';

	let { item }: { item: StatusCode } = $props();

	let status_class = $derived(get_class(item.class));
	let spec = $derived(get_spec(item.code));
	let confusions = $derived(get_confusions(item.code));
	let neighbours = $derived(get_neighbours(item.code));
	let curl = $derived(curl_command(SITE_URL, item.code));
</script>

<article>
	<header
		class="{class_bg[
			item.class
		]} mt-10 border-4 border-black p-5 shadow-hard sm:p-8"
	>
		<h1 class="flex flex-wrap items-baseline gap-x-6">
			<span
				class="text-[clamp(5rem,22vw,14rem)] leading-[0.8] font-black [font-stretch:125%]"
				>{item.code}</span
			>
			<span class="text-2xl font-black sm:text-4xl"
				>{item.message}</span
			>
		</h1>
		<p
			class="mt-6 max-w-4xl text-4xl leading-[0.95] font-black [font-stretch:125%] sm:text-6xl"
		>
			{item.blunt}
		</p>
	</header>

	<div class="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
		<div>
			<h2 class="text-2xl font-black [font-stretch:125%]">
				What it properly means
			</h2>
			<p class="mt-3 max-w-prose text-xl leading-relaxed font-medium">
				{item.detail}
			</p>

			<dl
				class="mt-6 grid max-w-prose grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-lg"
			>
				<dt class="font-black">Class</dt>
				<dd class="font-medium">
					{status_class.label}
					{status_class.name}: {status_class.blunt.toLowerCase()}
				</dd>
				{#if spec}
					<dt class="font-black">Defined in</dt>
					<dd class="font-medium">
						<a
							class="underline decoration-4 underline-offset-4 {focus_ring}"
							href={spec.url}
						>
							RFC {spec.rfc}{spec.section
								? `, section ${spec.section}`
								: ''}
						</a>
					</dd>
				{/if}
				{#if item.tags}
					<dt class="font-black">Notes</dt>
					<dd class="flex flex-wrap gap-2">
						{#each item.tags as tag (tag)}
							<span class="border-2 border-black px-2 font-bold"
								>{tag}</span
							>
						{/each}
					</dd>
				{/if}
			</dl>
		</div>

		<section aria-labelledby="try-title">
			<h2
				id="try-title"
				class="text-2xl font-black [font-stretch:125%]"
			>
				Get one yourself
			</h2>
			<p class="mt-3 text-lg font-medium">
				This endpoint really answers with {item.code}. Point your
				client at it and see what it does.
			</p>
			<div class="mt-4 border-4 border-black bg-black p-4 text-white">
				<code class="block font-mono text-base break-all">{curl}</code
				>
			</div>
			<CopyButton
				text={curl}
				label="Copy curl command"
				class="mt-4 border-4 border-black bg-class-3 px-4 py-2 font-bold {press} {focus_ring}"
			>
				{#snippet children(copied: boolean)}
					{copied ? 'Copied' : 'Copy command'}
				{/snippet}
			</CopyButton>
		</section>
	</div>

	{#if confusions.length > 0}
		<section class="mt-14" aria-labelledby="confused-title">
			<h2
				id="confused-title"
				class="text-2xl font-black [font-stretch:125%]"
			>
				People mix this up with
			</h2>
			<ul class="mt-5 grid gap-4 lg:grid-cols-2">
				{#each confusions as confusion (confusion.question)}
					<li class="border-4 border-black p-5">
						<p class="flex flex-wrap gap-2">
							{#each confusion.codes as code (code)}
								{@const other = get_code(code)!}
								{#if code === item.code}
									<span
										class="{class_bg[
											other.class
										]} border-4 border-black px-2 text-xl font-black"
										>{code}</span
									>
								{:else}
									<a
										href="/{code}"
										class="{class_bg[
											other.class
										]} border-4 border-black px-2 text-xl font-black {press} {focus_ring}"
										>{code} {other.message}</a
									>
								{/if}
							{/each}
						</p>
						<h3 class="mt-4 text-xl font-black">
							{confusion.question}
						</h3>
						<p class="mt-2 text-lg leading-relaxed font-medium">
							{confusion.answer}
						</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<nav
		aria-label="Other codes"
		class="mt-14 flex flex-wrap justify-between gap-4 text-lg font-bold"
	>
		{#if neighbours.previous}
			<a
				href="/{neighbours.previous.code}"
				class="border-4 border-black px-4 py-2 {press} {focus_ring}"
			>
				Previous: {neighbours.previous.code}
				{neighbours.previous.message}
			</a>
		{/if}
		<a
			href="/"
			class="border-4 border-black px-4 py-2 {press} {focus_ring}"
		>
			All codes
		</a>
		{#if neighbours.next}
			<a
				href="/{neighbours.next.code}"
				class="border-4 border-black px-4 py-2 {press} {focus_ring}"
			>
				Next: {neighbours.next.code}
				{neighbours.next.message}
			</a>
		{/if}
	</nav>
</article>
