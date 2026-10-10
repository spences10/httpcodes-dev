<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/seo.svelte';
	import { get_design } from '#lib/designs/index.js';

	let design = $derived(get_design(page.params.design));
</script>

<Seo
	title="HTTP status codes: what the server actually means"
	description="Every HTTP status code with a blunt one-line translation and the proper meaning. 4xx: you fucked up. 5xx: we fucked up."
	path="/"
	index={!design.base}
/>

<design.Home base={design.base} />
