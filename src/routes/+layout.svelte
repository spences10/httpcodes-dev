<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	if (import.meta.env.DEV) {
		// @ts-expect-error virtual modules are not typed
		$effect(() => void import('virtual:stylex:runtime'));
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if import.meta.env.DEV}
		<link rel="stylesheet" href="/virtual:stylex.css" />
	{/if}
</svelte:head>

{@render children()}
