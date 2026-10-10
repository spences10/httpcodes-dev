<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		text,
		label,
		class: class_name = '',
		children,
	}: {
		text: string;
		/** Accessible name, such as "Copy curl command". */
		label: string;
		class?: string;
		children: Snippet<[boolean]>;
	} = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const copy = async () => {
		await navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1500);
	};
</script>

<button
	type="button"
	class={class_name}
	aria-label={label}
	onclick={copy}
>
	{@render children(copied)}
</button>
<span class="sr-only" aria-live="polite"
	>{copied ? 'Copied' : ''}</span
>
