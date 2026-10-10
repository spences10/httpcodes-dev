<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/seo.svelte';
	import { get_design } from '#lib/designs/index.js';

	let { data } = $props();

	let design = $derived(get_design(page.params.design));
	let item = $derived(data.item);
</script>

<Seo
	title="{item.code} {item.message}: {item.blunt}"
	description="HTTP {item.code} {item.message}. {item.detail}"
	path="/{item.code}"
	index={!design.base}
/>

<design.Code base={design.base} {item} />
