import { describe, expect, test } from 'vite-plus/test';
import {
	classes,
	codes,
	get_class,
	get_code,
	search_codes,
} from './codes.js';

describe('codes data', () => {
	test('has unique codes in ascending order', () => {
		const numbers = codes.map((item) => item.code);

		expect(new Set(numbers).size).toBe(numbers.length);
		expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
	});

	test('every code sits in the class its first digit says', () => {
		for (const item of codes) {
			expect(Math.floor(item.code / 100)).toBe(item.class);
		}
	});

	test('every code has a message, blunt line and detail', () => {
		for (const item of codes) {
			expect(item.message.trim()).not.toBe('');
			expect(item.blunt.trim()).not.toBe('');
			expect(item.detail.trim()).not.toBe('');
		}
	});

	test('has all five classes', () => {
		expect(classes.map((item) => item.label)).toEqual([
			'1xx',
			'2xx',
			'3xx',
			'4xx',
			'5xx',
		]);
	});
});

describe('get_code', () => {
	test('finds a known code', () => {
		expect(get_code(418)?.message).toBe("I'm a teapot");
	});

	test('returns undefined for an unknown code', () => {
		expect(get_code(999)).toBeUndefined();
	});
});

describe('get_class', () => {
	test('returns the class for a digit', () => {
		expect(get_class(4).name).toBe('Client error');
	});
});

describe('search_codes', () => {
	test('returns everything for an empty or blank query', () => {
		expect(search_codes('')).toBe(codes);
		expect(search_codes('   ')).toBe(codes);
	});

	test('matches an exact code', () => {
		expect(search_codes('404').map((item) => item.code)).toEqual([
			404,
		]);
	});

	test('matches codes by prefix', () => {
		expect(search_codes('50').map((item) => item.code)).toEqual([
			500, 501, 502, 503, 504, 505, 506, 507, 508,
		]);
	});

	test('does not match digits in the middle of a code', () => {
		expect(search_codes('04')).toEqual([]);
	});

	test('matches a whole class with the xx form', () => {
		const results = search_codes('5XX');

		expect(results.length).toBeGreaterThan(0);
		expect(results.every((item) => item.class === 5)).toBe(true);
	});

	test('matches the message case-insensitively', () => {
		expect(search_codes('TEAPOT').map((item) => item.code)).toEqual([
			418,
		]);
	});

	test('matches the blunt line', () => {
		expect(
			search_codes('never heard of it').map((item) => item.code),
		).toEqual([404]);
	});

	test('matches the class name', () => {
		const results = search_codes('redirection');

		expect(results.length).toBeGreaterThan(0);
		expect(results.every((item) => item.class === 3)).toBe(true);
	});

	test('matches tags', () => {
		expect(
			search_codes('webdav').every((item) =>
				item.tags?.includes('webdav'),
			),
		).toBe(true);
		expect(search_codes('webdav').length).toBeGreaterThan(0);
	});

	test('returns nothing when there is no match', () => {
		expect(search_codes('zzzzzz')).toEqual([]);
	});
});
