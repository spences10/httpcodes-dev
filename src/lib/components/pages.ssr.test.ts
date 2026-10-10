import { codes, get_code } from '#lib/data/codes.js';
import { render } from 'svelte/server';
import { describe, expect, test } from 'vite-plus/test';
import Code from './code.svelte';
import Home from './home.svelte';
import Which from './which.svelte';

describe('pages SSR', () => {
	test('home renders a link to every code', () => {
		const { body } = render(Home, { props: {} });

		for (const item of codes) {
			expect(body).toContain(`href="/${item.code}"`);
		}
	});

	test('code page renders the blunt line and meaning', () => {
		const item = get_code(503)!;
		const { body } = render(Code, {
			props: { item },
		});

		expect(body).toContain('<h1');
		expect(body).toContain('Service Unavailable');
		expect(body).toContain('Not now.');
	});

	test('which page renders the first question', () => {
		const { body } = render(Which, { props: {} });

		expect(body).toContain('What happened to the request?');
	});
});
