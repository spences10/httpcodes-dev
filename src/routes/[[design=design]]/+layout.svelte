<script lang="ts">
	import { page } from '$app/state';
	import DesignSwitcher from '#lib/components/design-switcher.svelte';
	import { get_design } from '#lib/designs/index.js';

	let { children } = $props();

	let design = $derived(get_design(page.params.design));
</script>

<design.Shell base={design.base}>
	{@render children()}
</design.Shell>

<DesignSwitcher current={design} pathname={page.url.pathname} />
