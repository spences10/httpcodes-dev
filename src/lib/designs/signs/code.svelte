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
	import Plate from './plate.svelte';
	import {
		focus_ring,
		plate,
		text_link,
		white_sign,
	} from './styles.js';

	let { base, item }: { base: string; item: StatusCode } = $props();

	let status_class = $derived(get_class(item.class));
	let spec = $derived(get_spec(item.code));
	let confusions = $derived(get_confusions(item.code));
	let neighbours = $derived(get_neighbours(item.code));
	let curl = $derived(curl_command(SITE_URL, item.code));
</script>

<article>
	<header class="mt-6">
		<Plate digit={item.class} class="p-5 sm:p-8">
			<h1 class="flex flex-wrap items-center gap-x-6 gap-y-3">
				<span
					class="rounded-2xl border-4 border-black bg-white px-4 pt-3 text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] font-black text-black"
					>{item.code}</span
				>
				<span class="text-3xl font-extrabold sm:text-5xl"
					>{item.message}</span
				>
			</h1>
			<p
				class="mt-6 max-w-4xl text-4xl leading-none font-black tracking-tight sm:text-6xl"
			>
				{item.blunt}
			</p>
		</Plate>
	</header>

	<div class="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
		<div>
			<h2 class="text-2xl font-black">What it properly means</h2>
			<p class="mt-3 max-w-prose text-xl leading-relaxed">
				{item.detail}
			</p>

			<dl
				class="mt-6 grid max-w-prose grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-lg"
			>
				<dt class="font-extrabold">Class</dt>
				<dd>
					{status_class.label}
					{status_class.name}: {status_class.blunt.toLowerCase()}
				</dd>
				{#if spec}
					<dt class="font-extrabold">Defined in</dt>
					<dd>
						<a class={text_link} href={spec.url}>
							RFC {spec.rfc}{spec.section
								? `, section ${spec.section}`
								: ''}
						</a>
					</dd>
				{/if}
				{#if item.tags}
					<dt class="font-extrabold">Notes</dt>
					<dd>{item.tags.join(', ')}</dd>
				{/if}
			</dl>
		</div>

		<section aria-labelledby="try-title">
			<h2 id="try-title" class="text-2xl font-black">
				Get one yourself
			</h2>
			<p class="mt-3 text-lg">
				This endpoint really answers with {item.code}. Point your
				client at it and see what it does.
			</p>
			<code
				class="{white_sign} mt-4 block p-4 font-mono text-base break-all"
				>{curl}</code
			>
			<CopyButton
				text={curl}
				label="Copy curl command"
				class="mt-4 rounded-xl bg-signs-info px-4 pt-2.5 pb-2 text-lg font-bold text-white hover:brightness-110 {focus_ring}"
			>
				{#snippet children(copied: boolean)}
					{copied ? 'Copied' : 'Copy command'}
				{/snippet}
			</CopyButton>
		</section>
	</div>

	{#if confusions.length > 0}
		<section class="mt-14" aria-labelledby="confused-title">
			<h2 id="confused-title" class="text-2xl font-black">
				People mix this up with
			</h2>
			<ul class="mt-5 grid gap-4 lg:grid-cols-2">
				{#each confusions as confusion (confusion.question)}
					<li class="{white_sign} p-5">
						<p class="flex flex-wrap gap-2">
							{#each confusion.codes as code (code)}
								{@const other = get_code(code)!}
								{#if code === item.code}
									<span
										class="{plate[
											other.class
										]} rounded-lg px-3 pt-1 text-xl font-black"
										>{code}</span
									>
								{:else}
									<a
										href="{base}/{code}"
										class="{plate[
											other.class
										]} rounded-lg px-3 pt-1 text-xl font-black hover:brightness-110 {focus_ring}"
										>{code} {other.message}</a
									>
								{/if}
							{/each}
						</p>
						<h3 class="mt-4 text-xl font-extrabold">
							{confusion.question}
						</h3>
						<p class="mt-2 text-lg leading-relaxed">
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
				href="{base}/{neighbours.previous.code}"
				class="{white_sign} px-4 pt-2.5 pb-2 hover:bg-neutral-100 {focus_ring}"
			>
				<span aria-hidden="true">←</span>
				{neighbours.previous.code}
				{neighbours.previous.message}
			</a>
		{/if}
		<a
			href="{base}/"
			class="{white_sign} px-4 pt-2.5 pb-2 hover:bg-neutral-100 {focus_ring}"
		>
			All codes
		</a>
		{#if neighbours.next}
			<a
				href="{base}/{neighbours.next.code}"
				class="{white_sign} px-4 pt-2.5 pb-2 hover:bg-neutral-100 {focus_ring}"
			>
				{neighbours.next.code}
				{neighbours.next.message}
				<span aria-hidden="true">→</span>
			</a>
		{/if}
	</nav>
</article>
