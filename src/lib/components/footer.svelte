<script>
	import { GitHub, Twitter, YouTube } from '$lib/icons';
	import { ScottAvatar } from '$lib/images';
</script>

<footer
	class="footer footer-center md:footer-horizontal bg-primary text-primary-content p-10"
>
	<div>
		<img
			src={ScottAvatar}
			alt="Scott avatar"
			class="h-20 rounded-full"
		/>
		<p class="font-bold">
			Made with <span role="img" aria-label="red heart">❤️</span> by
			<a
				class="link hover:text-secondary transition"
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scott Spence
			</a>
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
