import { expect, test } from '@playwright/test';

test.describe('Smoke Tests', () => {
	test('searches from the homepage and opens a code', async ({
		page,
	}) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { level: 1 }),
		).toBeVisible();

		await page.getByRole('searchbox').fill('teapot');
		await page.getByRole('link', { name: /418/ }).click();

		await expect(page).toHaveURL('/418');
		await expect(
			page.getByRole('heading', { level: 1 }),
		).toContainText("I'm a teapot");
		await expect(page).toHaveTitle(/418 I'm a teapot/);
	});

	test('serves the other designs under their own prefix', async ({
		page,
	}) => {
		for (const prefix of ['/rfc', '/signs']) {
			await page.goto(`${prefix}/404`);

			await expect(
				page.getByRole('heading', { level: 1 }),
			).toContainText('404');
			await expect(
				page
					.getByRole('navigation', { name: 'Other codes' })
					.getByRole('link', { name: /405/ }),
			).toHaveAttribute('href', `${prefix}/405`);
		}
	});

	test('walks the which-code questions', async ({ page }) => {
		await page.goto('/which');

		await page.getByRole('button', { name: /It worked/ }).click();
		await page
			.getByRole('button', { name: /A new thing I just created/ })
			.click();

		await expect(
			page.getByRole('link', { name: /201/ }),
		).toBeVisible();
	});

	test('shows the blunt error page for an unknown URL', async ({
		page,
	}) => {
		const response = await page.goto('/nope');

		expect(response?.status()).toBe(404);
		await expect(page.getByText('Never heard of it.')).toBeVisible();
	});

	test('the API really answers with the status code', async ({
		request,
	}) => {
		const response = await request.get('/api/418');

		expect(response.status()).toBe(418);
		expect(response.headers()['x-translation']).toBe(
			"I'm a fucking teapot.",
		);
		expect(await response.json()).toMatchObject({ code: 418 });
	});
});
