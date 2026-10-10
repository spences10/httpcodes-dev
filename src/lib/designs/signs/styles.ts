import type { ClassDigit } from '#lib/data/codes.js';

// Road sign logic: blue informs, green lets you through, yellow diverts,
// red prohibits, and a striped black barrier means the road is closed.
export const plate: Record<ClassDigit, string> = {
	1: 'bg-signs-info text-white',
	2: 'bg-signs-go text-white',
	3: 'bg-signs-detour text-black',
	4: 'bg-signs-stop text-white',
	5: 'bg-black text-white',
};

export const keyline: Record<ClassDigit, string> = {
	1: 'border-white',
	2: 'border-white',
	3: 'border-black',
	4: 'border-white',
	5: 'border-white',
};

export const focus_ring =
	'focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black';

export const text_link = `underline decoration-2 underline-offset-4 ${focus_ring}`;

export const white_sign =
	'rounded-xl border-[3px] border-black bg-white text-black';
