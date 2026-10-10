import { join } from 'node:path';
import stylex from '@stylexjs/unplugin';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { coverageConfigDefaults, defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';

const ignore_patterns = [
	'.svelte-kit/**',
	'build/**',
	'coverage/**',
	'playwright-report/**',
	'test-results/**',
];

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules')
						? undefined
						: true,
			},
		}),
		{
			...stylex.vite({
				useCSSLayers: true,
				aliases: { '#lib/*': [join(process.cwd(), 'src/lib/*')] },
			}),
			// Run after Svelte has compiled components to JS.
			enforce: undefined,
			// The dev CSS middleware keeps Vitest's servers from closing.
			...(process.env.VITEST ? { configureServer: undefined } : {}),
		},
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				// Client-side tests (Svelte components)
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						ui: false,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},
			{
				// SSR tests (Server-side rendering)
				extends: './vite.config.ts',
				test: {
					name: 'ssr',
					environment: 'node',
					include: ['src/**/*.ssr.{test,spec}.{js,ts}'],
				},
			},
			{
				// Server-side tests (Node.js utilities)
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: [
						'src/**/*.svelte.{test,spec}.{js,ts}',
						'src/**/*.ssr.{test,spec}.{js,ts}',
					],
				},
			},
		],
		coverage: {
			reporter: ['text-summary', 'html'],
			provider: 'v8',
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: [
				...coverageConfigDefaults.exclude,
				'**/*.e2e.{js,ts}',
				'**/+page.svelte',
				'**/+layout.svelte',
				'**/+error.svelte',
			],
		},
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		printWidth: 70,
		trailingComma: 'all',
		proseWrap: 'always',
		svelte: true,
		ignorePatterns: [
			...ignore_patterns,
			'pnpm-lock.yaml',
			'.claude/settings.local.json',
		],
	},
	lint: {
		ignorePatterns: ignore_patterns,
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
});
