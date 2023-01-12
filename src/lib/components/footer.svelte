<script>
	import { GitHub, Twitter, YouTube } from '$lib/icons'
	import { ScottAvatar } from '$lib/images'
</script>

<footer
	class="p-10 footer bg-primary text-primary-content footer-center"
>
	<div>
		<img
			src={ScottAvatar}
			alt="Scott avatar"
			class="rounded-full h-20"
		/>
		<p class="font-bold">
			Made with <span role="img" aria-label="red heart">❤️</span> by
			<a
				class="link transition hover:text-secondary"
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scott Spence
			</a>
		</p>
		<p>
			Copyright © {`${new Date().getFullYear()}`} - All right reserved
		</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a aria-label="Twitter" href="https://twitter.com/spences10">
				<Twitter />
			</a>
			<a aria-label="GitHub" href="https://github.com/spences10">
				<GitHub />
			</a>
			<a aria-label="YouTube" href="https://ss10/yt">
				<YouTube />
			</a>
		</div>
	</div>
</footer>
