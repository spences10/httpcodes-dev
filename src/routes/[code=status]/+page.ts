import { get_code } from '#lib/data/codes.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const item = get_code(Number(params.code));
	if (!item) error(404, 'Not Found');
	return { item };
};
