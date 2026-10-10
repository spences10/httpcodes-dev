import type { RequestEvent } from '@sveltejs/kit';
import { describe, expect, test } from 'vite-plus/test';
import { fallback } from './+server.js';

const call = (code: string, method = 'GET') =>
	fallback({
		params: { code },
		request: new Request(`http://localhost/api/${code}`, { method }),
	} as unknown as RequestEvent) as Promise<Response> | Response;

describe('/api/[code]', () => {
	test('answers with the status code asked for', async () => {
		const response = await call('418');

		expect(response.status).toBe(418);
		expect(await response.json()).toMatchObject({
			code: 418,
			message: "I'm a teapot",
			blunt: "I'm a fucking teapot.",
			class: '4xx',
		});
	});

	test('puts the blunt line in a header', async () => {
		const response = await call('404');

		expect(response.headers.get('x-translation')).toBe(
			'Never heard of it.',
		);
	});

	test('allows any origin and is never cached', async () => {
		const response = await call('500');

		expect(response.headers.get('access-control-allow-origin')).toBe(
			'*',
		);
		expect(response.headers.get('cache-control')).toBe('no-store');
	});

	test('answers any method', async () => {
		const response = await call('503', 'DELETE');

		expect(response.status).toBe(503);
	});

	test.each(['204', '205', '304'])(
		'sends no body with %s',
		async (code) => {
			const response = await call(code);

			expect(response.status).toBe(Number(code));
			expect(await response.text()).toBe('');
		},
	);

	test('sends no body for HEAD', async () => {
		const response = await call('404', 'HEAD');

		expect(response.status).toBe(404);
		expect(await response.text()).toBe('');
	});

	test('explains 1xx codes with a 200', async () => {
		const response = await call('100');
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.code).toBe(100);
		expect(body.note).toMatch(/interim/);
	});

	test.each(['999', 'abc', '4040'])(
		'answers 404 for the unknown code %s',
		async (code) => {
			const response = await call(code);

			expect(response.status).toBe(404);
			expect(await response.json()).toMatchObject({
				error: 'Never heard of it.',
			});
		},
	);
});
