<script lang="ts">
	export let open = false
	export let text = ''

	// custom slide animation
	const slide = (node: HTMLDivElement, open: boolean) => {
		let initialHeight = node.offsetHeight
		node.style.height = open ? `auto` : '0px'
		node.style.overflow = 'hidden'

		let animation = node.animate(
			[{ height: '0px' }, { height: `${initialHeight}px` }],
			{
				duration: 300,
				easing: 'ease-in-out',
				fill: 'both',
				direction: open ? 'reverse' : 'normal',
			}
		)
		animation.pause()
		animation.onfinish = ({ currentTime }) => {
			if (currentTime === 0) {
				animation.reverse()
				animation.pause()
			}
			node.dispatchEvent(new CustomEvent('animationEnd'))
		}
		return {
			update: () => {
				animation.currentTime ? animation.reverse() : animation.play()
			},
		}
	}
</script>

<section class="mb-5 outline outline-base-300">
	<button
		on:click={() => {
			open = !open
		}}
	>
		<div class="flex items-center text-left">
			<span class="mx-3 transition" class:open>
				▶
			</span>
      
			<p class="p-1 mb-2">{text}</p>
		</div>
	</button>
	<div use:slide={open}>
		<slot />
	</div>
</section>

<style>
  .open {
    transform: rotate(90deg);
    transform-origin: center;
  }
</style>
