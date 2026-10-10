<script lang="ts">
	import { SITE_NAME, SITE_URL } from '#lib/site.js';

	let {
		title,
		description,
		path,
		index = true,
	}: {
		title: string;
		description: string;
		/** Canonical path, without any design prefix. */
		path: string;
		index?: boolean;
	} = $props();

	let url = $derived(`${SITE_URL}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#if !index}
		<meta name="robots" content="noindex" />
	{/if}
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
</svelte:head>
