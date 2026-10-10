import { get_code } from '#lib/data/codes.js';
import { describe, expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-svelte';
import { design_list } from './index.js';

// Every design has to pass the same behaviour, whatever it looks like.
describe.each(design_list)('$name design', (design) => {
	describe('home', () => {
		test('renders one main heading', async () => {
			await render(design.Home, { base: design.base });

			await expect
				.element(page.getByRole('heading', { level: 1 }))
				.toBeVisible();
		});

		test('links every class blunt line', async () => {
			await render(design.Home, { base: design.base });

			await expect
				.element(page.getByRole('link', { name: /4xx/ }).first())
				.toBeVisible();
			await expect
				.element(page.getByText('You fucked up').first())
				.toBeVisible();
		});

		test('links codes to their page under the design prefix', async () => {
			await render(design.Home, { base: design.base });

			await expect
				.element(page.getByRole('link', { name: /404 Not Found/ }))
				.toHaveAttribute('href', `${design.base}/404`);
		});

		test('filters codes as you type', async () => {
			await render(design.Home, { base: design.base });

			await page.getByRole('searchbox').fill('teapot');

			await expect
				.element(page.getByRole('link', { name: /418/ }))
				.toBeVisible();
			await expect
				.element(page.getByRole('link', { name: /404 Not Found/ }))
				.not.toBeInTheDocument();
			await expect
				.element(page.getByText(/1\s+code matches/))
				.toBeVisible();
		});

		test('says what to try when nothing matches', async () => {
			await render(design.Home, { base: design.base });

			await page.getByRole('searchbox').fill('zzzzzz');

			await expect
				.element(page.getByText(/Nothing matches/))
				.toBeVisible();
		});
	});

	describe('code page', () => {
		test('shows the code, name, blunt line and proper meaning', async () => {
			const item = get_code(404)!;
			await render(design.Code, { base: design.base, item });

			await expect
				.element(
					page.getByRole('heading', {
						level: 1,
						name: /404\s+Not Found/,
					}),
				)
				.toBeVisible();
			await expect
				.element(page.getByText(item.blunt).first())
				.toBeVisible();
			await expect.element(page.getByText(item.detail)).toBeVisible();
		});

		test('links to the spec', async () => {
			await render(design.Code, {
				base: design.base,
				item: get_code(404)!,
			});

			await expect
				.element(page.getByRole('link', { name: /RFC 9110/ }).first())
				.toHaveAttribute(
					'href',
					'https://httpwg.org/specs/rfc9110.html#status.404',
				);
		});

		test('links the codes it gets confused with', async () => {
			await render(design.Code, {
				base: design.base,
				item: get_code(401)!,
			});

			await expect
				.element(
					page.getByRole('link', { name: /403 Forbidden/ }).first(),
				)
				.toHaveAttribute('href', `${design.base}/403`);
		});

		test('confirms when the curl command is copied', async () => {
			await render(design.Code, {
				base: design.base,
				item: get_code(418)!,
			});
			let copied = '';
			navigator.clipboard.writeText = async (text) => {
				copied = text;
			};

			const button = page.getByRole('button', {
				name: 'Copy curl command',
			});
			await button.click();

			await expect.element(button.getByText(/Copied/)).toBeVisible();
			expect(copied).toBe('curl -i https://httpcodes.dev/api/418');
		});

		test('links to the neighbouring codes', async () => {
			await render(design.Code, {
				base: design.base,
				item: get_code(404)!,
			});
			const nav = page.getByRole('navigation', {
				name: 'Other codes',
			});

			await expect
				.element(nav.getByRole('link', { name: /403/ }))
				.toHaveAttribute('href', `${design.base}/403`);
			await expect
				.element(nav.getByRole('link', { name: /405/ }))
				.toHaveAttribute('href', `${design.base}/405`);
		});
	});

	describe('which code', () => {
		test('walks the questions to a code', async () => {
			await render(design.Which, { base: design.base });

			await page
				.getByRole('button', { name: /The client got it wrong/ })
				.click();
			await page
				.getByRole('button', { name: /I don't know who they are/ })
				.click();

			await expect
				.element(page.getByRole('link', { name: /401/ }))
				.toHaveAttribute('href', `${design.base}/401`);
			await expect
				.element(page.getByText('Who the fuck are you?'))
				.toBeVisible();
		});

		test('goes back one question', async () => {
			await render(design.Which, { base: design.base });

			await page.getByRole('button', { name: /It worked/ }).click();
			await page
				.getByRole('button', { name: /Back one question/ })
				.click();

			await expect
				.element(page.getByRole('button', { name: /It worked/ }))
				.toBeVisible();
		});

		test('starts again from a result', async () => {
			await render(design.Which, { base: design.base });

			await page
				.getByRole('button', { name: /The server got it wrong/ })
				.click();
			await page
				.getByRole('button', { name: /Our code blew up/ })
				.click();
			await page.getByRole('button', { name: /Start again/ }).click();

			await expect
				.element(page.getByRole('button', { name: /It worked/ }))
				.toBeVisible();
		});
	});
});
