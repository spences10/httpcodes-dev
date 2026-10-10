import { codes, get_code } from '#lib/data/codes.js';
import { render } from 'svelte/server';
import { describe, expect, test } from 'vite-plus/test';
import { design_list } from './index.js';

describe.each(design_list)('$name design SSR', (design) => {
	test('home renders a link to every code', () => {
		const { body } = render(design.Home, {
			props: { base: design.base },
		});

		for (const item of codes) {
			expect(body).toContain(`href="${design.base}/${item.code}"`);
		}
	});

	test('code page renders the blunt line and meaning', () => {
		const item = get_code(503)!;
		const { body } = render(design.Code, {
			props: { base: design.base, item },
		});

		expect(body).toContain('<h1');
		expect(body).toContain('Service Unavailable');
		expect(body).toContain('Not now.');
	});

	test('which page renders the first question', () => {
		const { body } = render(design.Which, {
			props: { base: design.base },
		});

		expect(body).toContain('What happened to the request?');
	});
});
