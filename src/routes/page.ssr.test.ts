import { render } from 'svelte/server';
import { describe, expect, test } from 'vite-plus/test';
import Page from './+page.svelte';

describe('/+page.svelte SSR', () => {
	test('renders the main heading on the server', () => {
		const { body } = render(Page);

		expect(body).toContain('<h1');
	});
});
