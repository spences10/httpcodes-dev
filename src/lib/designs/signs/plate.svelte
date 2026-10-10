<script lang="ts">
	import type { ClassDigit } from '#lib/data/codes.js';
	import type { Snippet } from 'svelte';
	import { focus_ring, keyline, plate } from './styles.js';

	let {
		digit,
		href,
		class: class_name = '',
		children,
	}: {
		digit: ClassDigit;
		href?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class="{plate[digit]} block rounded-2xl p-1.5 {href
		? `hover:brightness-110 ${focus_ring}`
		: ''}"
>
	<div
		class="{keyline[
			digit
		]} flex h-full flex-col overflow-hidden rounded-[10px] border-[3px]"
	>
		{#if digit === 5}
			<div
				aria-hidden="true"
				class="block h-4 shrink-0 bg-[repeating-linear-gradient(135deg,#ffd200_0_14px,#000_14px_28px)]"
			></div>
		{/if}
		<div class="block flex-1 {class_name}">
			{@render children()}
		</div>
	</div>
</svelte:element>
