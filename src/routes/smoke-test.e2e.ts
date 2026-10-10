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

	test('finds a code from the command palette', async ({ page }) => {
		await page.goto('/which');
		const search = page.getByRole('combobox');
		// The header button only works once the page has hydrated.
		await expect(async () => {
			await page.getByRole('button', { name: /Search/ }).click();
			await expect(search).toBeVisible({ timeout: 500 });
		}).toPass();
		await page.keyboard.press('Escape');
		await expect(search).toBeHidden();

		await page.keyboard.press('Control+k');
		await search.fill('teapot');
		await page.keyboard.press('Enter');

		await expect(page).toHaveURL('/418');
		await expect(search).toBeHidden();
	});

	test('serves an Open Graph image for a code', async ({
		page,
		request,
	}) => {
		await page.goto('/404');
		const image = await page
			.locator('meta[property="og:image"]')
			.getAttribute('content');

		expect(image).toBe('https://httpcodes.dev/og/404.png');
		const response = await request.get('/og/404.png');
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toBe('image/png');
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
		await expect(
			page.getByRole('main').getByText('Never heard of it.'),
		).toBeVisible();
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
