<script lang="ts" module>
	import * as stylex from '@stylexjs/stylex';
	import { colors } from '#lib/tokens.stylex.js';

	const styles = stylex.create({
		main: {
			minHeight: '100vh',
			display: 'grid',
			placeContent: 'center',
			gap: 16,
			backgroundColor: colors.paper,
			color: colors.ink,
			fontFamily: 'system-ui, sans-serif',
		},
		heading: {
			margin: 0,
			fontSize: {
				default: '3rem',
				'@media (min-width: 48rem)': '5rem',
			},
			fontWeight: 900,
		},
		button: {
			borderWidth: 3,
			borderStyle: 'solid',
			borderColor: colors.ink,
			backgroundColor: {
				default: colors.accent,
				':hover': colors.paper,
			},
			boxShadow: `6px 6px 0 ${colors.ink}`,
			padding: '0.75rem 1.5rem',
			fontWeight: 700,
			cursor: 'pointer',
		},
		pressed: {
			boxShadow: 'none',
			translate: '6px 6px',
		},
	});
</script>

<script lang="ts">
	let pressed = $state(false);
</script>

<main {...stylex.attrs(styles.main)}>
	<h1 {...stylex.attrs(styles.heading)}>HTTP Codes</h1>
	<button
		{...stylex.attrs(styles.button, pressed && styles.pressed)}
		onclick={() => (pressed = !pressed)}
	>
		StyleX spike: {pressed ? 'pressed' : 'press me'}
	</button>
</main>
