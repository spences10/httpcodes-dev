<script lang="ts">
	import '@fontsource-variable/archivo/standard.css';
	import { MDN_URL, REPO_URL } from '#lib/site.js';
	import type { Snippet } from 'svelte';

	let { base, children }: { base: string; children: Snippet } =
		$props();
</script>

<div class="flex min-h-screen flex-col bg-white font-brut text-black">
	<header class="border-b-4 border-black">
		<nav
			aria-label="Main"
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3"
		>
			<a
				href="{base}/"
				class="text-2xl font-black [font-stretch:125%] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black"
			>
				HTTP Codes
			</a>
			<a
				href="{base}/which"
				class="border-4 border-black bg-brut-3 px-4 py-2 font-bold shadow-brut-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black motion-safe:transition-transform"
			>
				Which code do I return?
			</a>
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
