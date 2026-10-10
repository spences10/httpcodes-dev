<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import CommandPalette from '#lib/components/command-palette.svelte';
	import { MDN_URL, REPO_URL } from '#lib/site.js';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$app/env/public';
	import { afterNavigate } from '$app/navigation';
	import '@fontsource-variable/archivo/standard.css';
	import * as Fathom from 'fathom-client';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();

	let palette_open = $state(false);

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	// Track pageview on route change
	afterNavigate(({ shallow }) => {
		if (shallow) return;

		Fathom.trackPageview();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-white font-sans text-black">
	<header class="border-b-4 border-black">
		<nav
			aria-label="Main"
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3"
		>
			<a
				href="/"
				class="text-2xl font-black font-stretch-125% focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black"
			>
				HTTP Codes
			</a>
			<div class="flex flex-wrap items-center gap-3">
				<button
					type="button"
					onclick={() => (palette_open = true)}
					aria-keyshortcuts="Control+K Meta+K"
					class="flex items-center gap-3 border-4 border-black bg-white px-4 py-2 font-bold shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-transform"
				>
					Search
					<kbd
						class="bg-black px-1.5 py-0.5 font-sans text-sm text-white"
						>Ctrl K</kbd
					>
				</button>
				<a
					href="/which"
					class="border-4 border-black bg-class-3 px-4 py-2 font-bold shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-transform"
				>
					Which code do I return?
				</a>
			</div>
		</nav>
	</header>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 pb-24">
		{@render children()}
	</main>

	<footer class="border-t-4 border-black bg-black text-white">
		<p class="mx-auto max-w-6xl px-4 py-6 font-medium">
			Proper meanings paraphrased from
			<a
				class="underline decoration-2 underline-offset-4"
				href={MDN_URL}>MDN</a
			>
			and
			<a
				class="underline decoration-2 underline-offset-4"
				href="https://httpwg.org/specs/rfc9110.html">RFC 9110</a
			>. The swearing is ours.
			<a
				class="underline decoration-2 underline-offset-4"
				href={REPO_URL}>Source on GitHub</a
			>.
		</p>
	</footer>
</div>

<CommandPalette bind:open={palette_open} />
