import type { Component, Snippet } from 'svelte';
import type { StatusCode } from '../data/codes.js';
import {
	DEFAULT_DESIGN,
	is_design_param,
	type DesignId,
} from './ids.js';
import BrutCode from './brut/code.svelte';
import BrutHome from './brut/home.svelte';
import BrutShell from './brut/shell.svelte';
import BrutWhich from './brut/which.svelte';
import RfcCode from './rfc/code.svelte';
import RfcHome from './rfc/home.svelte';
import RfcShell from './rfc/shell.svelte';
import RfcWhich from './rfc/which.svelte';
import SignsCode from './signs/code.svelte';
import SignsHome from './signs/home.svelte';
import SignsShell from './signs/shell.svelte';
import SignsWhich from './signs/which.svelte';

export interface Design {
	id: DesignId;
	name: string;
	/** URL prefix: empty for the default design. */
	base: string;
	Shell: Component<{ base: string; children: Snippet }>;
	Home: Component<{ base: string }>;
	Code: Component<{ base: string; item: StatusCode }>;
	Which: Component<{ base: string }>;
}

export const designs: Record<DesignId, Design> = {
	brut: {
		id: 'brut',
		name: 'Brut',
		base: '',
		Shell: BrutShell,
		Home: BrutHome,
		Code: BrutCode,
		Which: BrutWhich,
	},
	rfc: {
		id: 'rfc',
		name: 'RFC',
		base: '/rfc',
		Shell: RfcShell,
		Home: RfcHome,
		Code: RfcCode,
		Which: RfcWhich,
	},
	signs: {
		id: 'signs',
		name: 'Signs',
		base: '/signs',
		Shell: SignsShell,
		Home: SignsHome,
		Code: SignsCode,
		Which: SignsWhich,
	},
};

export const design_list = Object.values(designs);

export const get_design = (param: string | undefined): Design =>
	param && is_design_param(param)
		? designs[param]
		: designs[DEFAULT_DESIGN];

export { DEFAULT_DESIGN, is_design_param, type DesignId };
