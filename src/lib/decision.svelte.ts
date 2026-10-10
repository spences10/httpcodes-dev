import { get_code, type StatusCode } from './data/codes.js';
import {
	get_node,
	ROOT_ID,
	type DecisionNode,
	type DecisionOption,
} from './data/decision.js';

export interface DecisionStep {
	question: string;
	answer: string;
}

/** State for the "which code should I return?" flow. */
export const create_decision = () => {
	let node_id = $state(ROOT_ID);
	let steps = $state<DecisionStep[]>([]);
	let history = $state<string[]>([]);
	let result = $state<StatusCode | undefined>();

	return {
		get node(): DecisionNode {
			return get_node(node_id)!;
		},
		get steps() {
			return steps;
		},
		get result() {
			return result;
		},
		get can_go_back() {
			return history.length > 0;
		},
		choose(option: DecisionOption) {
			const current = get_node(node_id)!;
			steps.push({
				question: current.question,
				answer: option.label,
			});
			history.push(node_id);
			if (option.code) result = get_code(option.code);
			else if (option.next) node_id = option.next;
		},
		back() {
			const previous = history.pop();
			if (!previous) return;
			steps.pop();
			result = undefined;
			node_id = previous;
		},
		reset() {
			node_id = ROOT_ID;
			steps = [];
			history = [];
			result = undefined;
		},
	};
};

export type Decision = ReturnType<typeof create_decision>;
