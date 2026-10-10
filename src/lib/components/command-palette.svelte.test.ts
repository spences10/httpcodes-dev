import { describe, expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-svelte';
import CommandPalette from './command-palette.svelte';

const search = () => page.getByRole('combobox');
const selected = () => page.getByRole('option', { selected: true });

/** Records link clicks instead of letting the test page navigate. */
const capture_navigation = () => {
	const visited: string[] = [];
	document.addEventListener(
		'click',
		(event) => {
			const link = (event.target as Element).closest('a');
			if (!link) return;
			event.preventDefault();
			visited.push(link.getAttribute('href')!);
		},
		{ once: true },
	);
	return visited;
};

describe('command palette', () => {
	test('stays closed until asked for', async () => {
		await render(CommandPalette);

		await expect.element(search()).not.toBeInTheDocument();
	});

	test('opens with Ctrl+K and focuses the search', async () => {
		await render(CommandPalette);

		await userEvent.keyboard('{Control>}k{/Control}');

		await expect.element(search()).toBeVisible();
		await expect.element(search()).toHaveFocus();
	});

	test('opens with Cmd+K', async () => {
		await render(CommandPalette);

		await userEvent.keyboard('{Meta>}k{/Meta}');

		await expect.element(search()).toBeVisible();
	});

	test('closes with Ctrl+K when already open', async () => {
		await render(CommandPalette, { open: true });

		await userEvent.keyboard('{Control>}k{/Control}');

		await expect.element(search()).not.toBeInTheDocument();
	});

	test('closes with Escape', async () => {
		await render(CommandPalette, { open: true });
		await expect.element(search()).toBeVisible();

		await userEvent.keyboard('{Escape}');

		await expect.element(search()).not.toBeInTheDocument();
	});

	test('closes with the Esc button', async () => {
		await render(CommandPalette, { open: true });

		await page.getByRole('button', { name: 'Esc' }).click();

		await expect.element(search()).not.toBeInTheDocument();
	});

	test('lists the pages first, then every code', async () => {
		await render(CommandPalette, { open: true });

		await expect.element(selected()).toHaveAttribute('href', '/');
		await expect
			.element(
				page.getByRole('option', { name: /Which code do I return/ }),
			)
			.toHaveAttribute('href', '/which');
		await expect
			.element(page.getByRole('option', { name: /404/ }))
			.toHaveAttribute('href', '/404');
	});

	test('filters as you type and selects the first match', async () => {
		await render(CommandPalette, { open: true });

		await search().fill('teapot');

		await expect.element(selected()).toHaveAttribute('href', '/418');
		await expect
			.element(page.getByRole('option', { name: /404/ }))
			.not.toBeInTheDocument();
	});

	test('finds pages by name', async () => {
		await render(CommandPalette, { open: true });

		await search().fill('which');

		await expect
			.element(selected())
			.toHaveAttribute('href', '/which');
	});

	test('moves the selection with the arrow keys and wraps', async () => {
		await render(CommandPalette, { open: true });
		await search().fill('50');
		await expect.element(selected()).toHaveAttribute('href', '/500');

		await userEvent.keyboard('{ArrowDown}');
		await expect.element(selected()).toHaveAttribute('href', '/501');

		await userEvent.keyboard('{ArrowUp}{ArrowUp}');
		await expect.element(selected()).toHaveAttribute('href', '/508');

		await userEvent.keyboard('{Home}');
		await expect.element(selected()).toHaveAttribute('href', '/500');
	});

	test('points the search at the selected option', async () => {
		await render(CommandPalette, { open: true });

		await search().fill('404');

		await expect
			.element(search())
			.toHaveAttribute('aria-activedescendant', 'palette-code-404');
	});

	test('Enter opens the selected result and closes', async () => {
		await render(CommandPalette, { open: true });
		const visited = capture_navigation();

		await search().fill('teapot');
		await userEvent.keyboard('{Enter}');

		await expect.element(search()).not.toBeInTheDocument();
		expect(visited).toEqual(['/418']);
	});

	test('clicking a result opens it and closes', async () => {
		await render(CommandPalette, { open: true });
		const visited = capture_navigation();

		await search().fill('503');
		await page.getByRole('option', { name: /503/ }).click();

		await expect.element(search()).not.toBeInTheDocument();
		expect(visited).toEqual(['/503']);
	});

	test('says what to try when nothing matches', async () => {
		await render(CommandPalette, { open: true });

		await search().fill('zzzzzz');

		await expect
			.element(page.getByText(/Nothing matches/))
			.toBeVisible();
		await expect
			.element(page.getByRole('option').first())
			.not.toBeInTheDocument();
	});

	test('starts with an empty search each time it opens', async () => {
		await render(CommandPalette, { open: true });
		await search().fill('teapot');
		await userEvent.keyboard('{Escape}');

		await userEvent.keyboard('{Control>}k{/Control}');

		await expect.element(search()).toHaveValue('');
	});
});
