import { defineParams } from '@sveltejs/kit/params';
// SvelteKit loads this file outside of Vite, so this import needs a real
// file extension and must not pull in Svelte components.
import { get_code } from './lib/data/codes.ts';

export const params = defineParams({
	status: (param) =>
		/^\d{3}$/.test(param) && get_code(Number(param))
			? param
			: undefined,
});
