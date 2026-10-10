<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/seo.svelte';
	import { get_design } from '#lib/designs/index.js';

	let design = $derived(get_design(page.params.design));
</script>

<Seo
	title="Which HTTP status code do I return?"
	description="Answer a couple of questions about what happened to the request and get the right HTTP status code to send back."
	path="/which"
	index={!design.base}
/>

<design.Which base={design.base} />
