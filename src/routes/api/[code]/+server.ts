import { get_class, get_code } from '#lib/data/codes.js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const prerender = false;

// These statuses are not allowed to carry a body.
const NO_BODY = new Set([204, 205, 304]);

const headers = {
	'access-control-allow-origin': '*',
	'cache-control': 'no-store',
};

/** Answers any method with the status code in the URL. */
export const fallback: RequestHandler = ({ params, request }) => {
	const item = /^\d{3}$/.test(params.code ?? '')
		? get_code(Number(params.code))
		: undefined;

	if (!item) {
		return json(
			{
				error: 'Never heard of it.',
				hint: 'Ask for a real status code, such as /api/418.',
			},
			{ status: 404, headers },
		);
	}

	const body = {
		code: item.code,
		message: item.message,
		blunt: item.blunt,
		detail: item.detail,
		class: get_class(item.class).label,
	};
	const response_headers = {
		...headers,
		'x-translation': item.blunt,
	};

	// 1xx responses are interim, so they cannot be sent as the final answer.
	if (item.code < 200) {
		return json(
			{
				...body,
				note: `${item.code} is an interim response and cannot be sent as a final one, so this is a 200 telling you about it.`,
			},
			{ status: 200, headers: response_headers },
		);
	}

	if (NO_BODY.has(item.code) || request.method === 'HEAD') {
		return new Response(null, {
			status: item.code,
			headers: response_headers,
		});
	}

	return json(body, { status: item.code, headers: response_headers });
};
