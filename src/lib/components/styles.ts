import type { ClassDigit } from '#lib/data/codes.js';

export const class_bg: Record<ClassDigit, string> = {
	1: 'bg-class-1',
	2: 'bg-class-2',
	3: 'bg-class-3',
	4: 'bg-class-4',
	5: 'bg-class-5',
};

export const class_hover_bg: Record<ClassDigit, string> = {
	1: 'hover:bg-class-1',
	2: 'hover:bg-class-2',
	3: 'hover:bg-class-3',
	4: 'hover:bg-class-4',
	5: 'hover:bg-class-5',
};

export const focus_ring =
	'focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black';

export const press =
	'shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none motion-safe:transition-transform';
