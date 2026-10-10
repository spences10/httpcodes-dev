<script lang="ts">
	import Code from '#lib/components/code.svelte';
	import Seo from '#lib/components/seo.svelte';

	let { data } = $props();

	let item = $derived(data.item);
</script>

<Seo
	title="{item.code} {item.message}: {item.blunt}"
	description="HTTP {item.code} {item.message}. {item.detail}"
	path="/{item.code}"
/>

<Code {item} />
