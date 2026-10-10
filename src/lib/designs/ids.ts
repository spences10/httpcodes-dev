// Kept free of imports: `src/params.ts` loads this outside of Vite.
export const design_ids = ['brut', 'rfc', 'signs'] as const;

export type DesignId = (typeof design_ids)[number];

export const DEFAULT_DESIGN: DesignId = 'brut';

export const is_design_param = (param: string): param is DesignId =>
	param !== DEFAULT_DESIGN &&
	(design_ids as readonly string[]).includes(param);
