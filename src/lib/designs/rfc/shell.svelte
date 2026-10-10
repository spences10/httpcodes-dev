<script lang="ts">
	import '@fontsource/courier-prime/400.css';
	import '@fontsource/courier-prime/700.css';
	import { MDN_URL, REPO_URL } from '#lib/site.js';
	import type { Snippet } from 'svelte';
	import { link } from './styles.js';

	let { base, children }: { base: string; children: Snippet } =
		$props();
</script>

<div
	class="min-h-screen bg-white font-rfc text-[15px] leading-[1.4] text-black sm:text-base"
>
	<div class="mx-auto max-w-[76ch] px-[2ch] py-8">
		<header>
			<nav
				aria-label="Main"
				class="flex flex-wrap justify-between gap-x-[4ch]"
			>
				<a class={link} href="{base}/">HTTP Status Codes</a>
				<a class={link} href="{base}/which">Which code do I return?</a
				>
			</nav>
		</header>

		<main class="mt-8">
			{@render children()}
		</main>

		<footer class="mt-12 border-t border-black pt-4 text-rfc-dim">
			<p>
				Proper meanings paraphrased from
				<a class={link} href={MDN_URL}>MDN</a> and
				<a class={link} href="https://httpwg.org/specs/rfc9110.html"
					>RFC 9110</a
				>. This memo is not an Internet Standard of any kind.
				<a class={link} href={REPO_URL}>Source on GitHub</a>.
			</p>
		</footer>
	</div>
</div>
