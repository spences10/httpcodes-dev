import { defineParams } from '@sveltejs/kit/params';
// SvelteKit loads this file outside of Vite, so these imports need real
// file extensions and must not pull in Svelte components.
import { get_code } from './lib/data/codes.ts';
import { is_design_param } from './lib/designs/ids.ts';

export const params = defineParams({
	// Only the non-default designs get a URL prefix.
	design: (param) => (is_design_param(param) ? param : undefined),
	status: (param) =>
		/^\d{3}$/.test(param) && get_code(Number(param))
			? param
			: undefined,
});
