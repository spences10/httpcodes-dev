import { expect, test } from '@playwright/test';

test.describe('Smoke Tests', () => {
	test('loads the homepage', async ({ page }) => {
		await page.goto('/');

		await expect(
			page.getByRole('heading', { level: 1 }),
		).toBeVisible();
	});
});
