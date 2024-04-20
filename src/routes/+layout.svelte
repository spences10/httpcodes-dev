<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public';
	import * as Fathom from 'fathom-client';
	import '../app.pcss';
	import { Footer } from '$lib/components';

	let { children } = $props();

	$effect(() => {
		if (browser) {
			Fathom.load(PUBLIC_FATHOM_ID, {
				url: PUBLIC_FATHOM_URL,
			});
		}
	});

	// Track pageview on route change
	$effect(() => {
		$page.url.pathname, browser && Fathom.trackPageview();
	});
</script>

<div class="flex min-h-screen flex-col overflow-x-hidden">
	<main class="container mx-auto mb-20 max-w-3xl flex-grow px-4">
		{@render children()}
	</main>
	<Footer />
</div>
