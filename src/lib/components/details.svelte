<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		open = false,
		text = '',
		children,
	}: {
		open?: boolean;
		text?: string;
		children?: Snippet;
	} = $props();

	// custom slide animation
	const slide = (node: HTMLDivElement, open: boolean) => {
		let initialHeight = node.offsetHeight;
		node.style.height = open ? `auto` : '0px';
		node.style.overflow = 'hidden';

		let animation = node.animate(
			[{ height: '0px' }, { height: `${initialHeight}px` }],
			{
				duration: 300,
				easing: 'ease-in-out',
				fill: 'both',
				direction: open ? 'reverse' : 'normal',
			}
		);
		animation.pause();
		animation.onfinish = ({ currentTime }) => {
			if (currentTime === 0) {
				animation.reverse();
				animation.pause();
			}
			node.dispatchEvent(new CustomEvent('animationEnd'));
		};
		return {
			update: () => {
				animation.currentTime
					? animation.reverse()
					: animation.play();
			},
		};
	};
</script>

<section class="mb-5 outline outline-base-300">
	<button
		onclick={() => {
			open = !open;
		}}
	>
		<div class="flex items-center text-left">
			<span class="mx-3 transition" class:open> ▶ </span>

			<p class="mb-2 p-1">{text}</p>
		</div>
	</button>
	<div use:slide={open}>
		{@render children?.()}
	</div>
</section>

<style>
	.open {
		transform: rotate(90deg);
		transform-origin: center;
	}
</style>
