import {
	classes,
	codes,
	type StatusClass,
	type StatusCode,
} from './codes.js';

export interface CodeGroup {
	class: StatusClass;
	items: StatusCode[];
}

/** Group codes by class, dropping classes with nothing in them. */
export const group_by_class = (items: StatusCode[]): CodeGroup[] =>
	classes
		.map((status_class) => ({
			class: status_class,
			items: items.filter(
				(item) => item.class === status_class.digit,
			),
		}))
		.filter((group) => group.items.length > 0);

export const get_neighbours = (
	code: number,
): { previous?: StatusCode; next?: StatusCode } => {
	const index = codes.findIndex((item) => item.code === code);
	return { previous: codes[index - 1], next: codes[index + 1] };
};

export const curl_command = (
	site_url: string,
	code: number,
): string => `curl -i ${site_url}/api/${code}`;
