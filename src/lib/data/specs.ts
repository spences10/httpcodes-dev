export interface Spec {
	rfc: number;
	/** Section number, only for codes defined in RFC 9110. */
	section?: string;
	url: string;
}

// RFC 9110 section 15 lists its codes in this order, one subsection each.
const rfc_9110: Record<number, number[]> = {
	2: [100, 101],
	3: [200, 201, 202, 203, 204, 205, 206],
	4: [300, 301, 302, 303, 304, 305, 306, 307, 308],
	5: [
		400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412,
		413, 414, 415, 416, 417, 418, 421, 422, 426,
	],
	6: [500, 501, 502, 503, 504, 505],
};

// Codes defined outside RFC 9110.
const other_rfcs: Record<number, number> = {
	102: 2518,
	103: 8297,
	207: 4918,
	208: 5842,
	226: 3229,
	423: 4918,
	424: 4918,
	425: 8470,
	428: 6585,
	429: 6585,
	431: 6585,
	451: 7725,
	506: 2295,
	507: 4918,
	508: 5842,
	510: 2774,
	511: 6585,
};

export const get_spec = (code: number): Spec | undefined => {
	for (const [group, list] of Object.entries(rfc_9110)) {
		const index = list.indexOf(code);
		if (index !== -1) {
			return {
				rfc: 9110,
				section: `15.${group}.${index + 1}`,
				url: `https://httpwg.org/specs/rfc9110.html#status.${code}`,
			};
		}
	}

	const rfc = other_rfcs[code];
	if (!rfc) return undefined;
	return { rfc, url: `https://www.rfc-editor.org/rfc/rfc${rfc}` };
};
