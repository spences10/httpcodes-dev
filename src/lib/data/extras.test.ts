import { describe, expect, test } from 'vite-plus/test';
import { codes, get_code, search_codes } from './codes.js';
import { confusions, get_confusions } from './confusions.js';
import { decision_nodes, get_node, ROOT_ID } from './decision.js';
import {
	curl_command,
	get_neighbours,
	group_by_class,
} from './groups.js';
import { get_spec } from './specs.js';

describe('specs', () => {
	test('every code has a spec reference', () => {
		for (const item of codes) {
			expect(get_spec(item.code), String(item.code)).toBeDefined();
		}
	});

	test('RFC 9110 codes carry their section number', () => {
		expect(get_spec(404)).toEqual({
			rfc: 9110,
			section: '15.5.5',
			url: 'https://httpwg.org/specs/rfc9110.html#status.404',
		});
		expect(get_spec(100)?.section).toBe('15.2.1');
		expect(get_spec(505)?.section).toBe('15.6.6');
	});

	test('codes from other RFCs link to that RFC', () => {
		expect(get_spec(429)).toEqual({
			rfc: 6585,
			url: 'https://www.rfc-editor.org/rfc/rfc6585',
		});
	});

	test('returns undefined for an unknown code', () => {
		expect(get_spec(999)).toBeUndefined();
	});
});

describe('confusions', () => {
	test('only reference real codes, at least two each', () => {
		for (const item of confusions) {
			expect(item.codes.length).toBeGreaterThanOrEqual(2);
			for (const code of item.codes) {
				expect(get_code(code), String(code)).toBeDefined();
			}
		}
	});

	test('finds every confusion a code is part of', () => {
		const questions = get_confusions(403).map((item) => item.codes);

		expect(questions).toEqual([
			[401, 403],
			[403, 404],
		]);
	});

	test('returns nothing for a code nobody mixes up', () => {
		expect(get_confusions(418)).toEqual([]);
	});
});

describe('decision tree', () => {
	test('every option leads to a real question or a real code', () => {
		for (const node of decision_nodes) {
			for (const option of node.options) {
				if (option.next) {
					expect(get_node(option.next), option.next).toBeDefined();
				} else {
					expect(get_code(option.code!), option.label).toBeDefined();
				}
			}
		}
	});

	test('every question can be reached from the start', () => {
		const seen = new Set<string>();
		const visit = (id: string) => {
			if (seen.has(id)) return;
			seen.add(id);
			for (const option of get_node(id)!.options) {
				if (option.next) visit(option.next);
			}
		};
		visit(ROOT_ID);

		expect([...seen].sort()).toEqual(
			decision_nodes.map((node) => node.id).sort(),
		);
	});

	test('option labels are unique within a question', () => {
		for (const node of decision_nodes) {
			const labels = node.options.map((option) => option.label);

			expect(new Set(labels).size, node.id).toBe(labels.length);
		}
	});
});

describe('groups', () => {
	test('groups codes by class and drops empty classes', () => {
		const groups = group_by_class(search_codes('50'));

		expect(groups.map((group) => group.class.label)).toEqual(['5xx']);
		expect(groups[0].items.length).toBe(9);
	});

	test('finds the neighbours of a code', () => {
		const { previous, next } = get_neighbours(418);

		expect(previous?.code).toBe(417);
		expect(next?.code).toBe(421);
	});

	test('the first and last codes have one neighbour', () => {
		expect(get_neighbours(100).previous).toBeUndefined();
		expect(get_neighbours(511).next).toBeUndefined();
	});

	test('builds the curl command', () => {
		expect(curl_command('https://httpcodes.dev', 418)).toBe(
			'curl -i https://httpcodes.dev/api/418',
		);
	});
});
