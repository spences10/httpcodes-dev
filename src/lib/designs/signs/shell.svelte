<script lang="ts">
	import '@fontsource-variable/overpass/wght.css';
	import { MDN_URL, REPO_URL } from '#lib/site.js';
	import type { Snippet } from 'svelte';
	import { focus_ring, text_link, white_sign } from './styles.js';

	let { base, children }: { base: string; children: Snippet } =
		$props();
</script>

<div
	class="flex min-h-screen flex-col bg-signs-ground font-signs text-black"
>
	<header>
		<nav
			aria-label="Main"
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4"
		>
			<a
				href="{base}/"
				class="rounded-xl bg-signs-go p-1 text-white {focus_ring}"
			>
				<span
					class="block rounded-lg border-2 border-white px-3 pt-1 text-xl font-extrabold"
					>HTTP Codes</span
				>
			</a>
			<a
				href="{base}/which"
				class="{white_sign} px-3 pt-1 text-lg font-bold hover:bg-neutral-100 {focus_ring}"
			>
				Which code do I return?
			</a>
		</nav>
	</header>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 pb-24">
		{@render children()}
	</main>

	<footer class="border-t-2 border-black/20">
		<p class="mx-auto max-w-6xl px-4 py-6">
			Proper meanings paraphrased from
			<a class={text_link} href={MDN_URL}>MDN</a>
			and
			<a
				class={text_link}
				href="https://httpwg.org/specs/rfc9110.html">RFC 9110</a
			>. The swearing is ours.
			<a class={text_link} href={REPO_URL}>Source on GitHub</a>.
		</p>
	</footer>
</div>
