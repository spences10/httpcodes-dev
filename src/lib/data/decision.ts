export interface DecisionOption {
	label: string;
	/** Id of the next question. */
	next?: string;
	/** The answer: a status code. */
	code?: number;
}

export interface DecisionNode {
	id: string;
	question: string;
	options: DecisionOption[];
}

export const ROOT_ID = 'start';

export const decision_nodes: DecisionNode[] = [
	{
		id: ROOT_ID,
		question: 'What happened to the request?',
		options: [
			{ label: 'It worked', next: 'success' },
			{ label: 'The thing lives somewhere else', next: 'redirect' },
			{ label: 'The client got it wrong', next: 'client' },
			{ label: 'The server got it wrong', next: 'server' },
		],
	},
	{
		id: 'success',
		question: 'What are you sending back?',
		options: [
			{ label: 'The thing they asked for', code: 200 },
			{ label: 'A new thing I just created', code: 201 },
			{ label: 'Nothing, it is just done', code: 204 },
			{ label: 'Nothing yet, I queued it for later', code: 202 },
			{ label: 'Only the byte range they asked for', code: 206 },
			{
				label: 'Nothing, their cached copy is still good',
				code: 304,
			},
		],
	},
	{
		id: 'redirect',
		question: 'How long is it moving for?',
		options: [
			{ label: 'For good', next: 'redirect-permanent' },
			{ label: 'Just for now', next: 'redirect-temporary' },
		],
	},
	{
		id: 'redirect-permanent',
		question: 'Must a POST stay a POST when the client follows it?',
		options: [
			{ label: 'Yes, keep the method and body', code: 308 },
			{ label: 'No, or it is only ever a GET', code: 301 },
		],
	},
	{
		id: 'redirect-temporary',
		question: 'What should the client do at the new URL?',
		options: [
			{ label: 'Repeat the same method and body', code: 307 },
			{
				label: 'GET a result page, like after a form POST',
				code: 303,
			},
			{ label: 'Whatever, it is only ever a GET', code: 302 },
		],
	},
	{
		id: 'client',
		question: 'What is wrong with it?',
		options: [
			{ label: "I don't know who they are", code: 401 },
			{
				label: 'I know who they are and they are not allowed',
				code: 403,
			},
			{ label: 'The thing they want is not there', next: 'missing' },
			{ label: 'The request itself is wrong', next: 'bad-request' },
			{
				label: 'It clashes with what is already there',
				next: 'clash',
			},
			{ label: 'They are sending too many requests', code: 429 },
		],
	},
	{
		id: 'missing',
		question: 'Was it there once, and removed on purpose for good?',
		options: [
			{ label: 'Yes, and it is never coming back', code: 410 },
			{ label: "No, or I don't want to say", code: 404 },
		],
	},
	{
		id: 'bad-request',
		question: 'Wrong how?',
		options: [
			{ label: "I can't even parse it", code: 400 },
			{ label: 'It parses, but fails validation', code: 422 },
			{ label: 'Wrong method for this URL', code: 405 },
			{ label: "A body format I don't accept", code: 415 },
			{ label: 'The body is too big', code: 413 },
		],
	},
	{
		id: 'clash',
		question: 'Did the client send a condition like If-Match?',
		options: [
			{ label: 'Yes, and the condition failed', code: 412 },
			{
				label: 'No, it just conflicts with current state',
				code: 409,
			},
		],
	},
	{
		id: 'server',
		question: 'What went wrong on your side?',
		options: [
			{ label: 'Our code blew up', code: 500 },
			{ label: 'We never built that', code: 501 },
			{ label: 'A server behind us sent back rubbish', code: 502 },
			{ label: 'A server behind us never answered', code: 504 },
			{
				label: 'We are overloaded or down for maintenance',
				code: 503,
			},
		],
	},
];

export const get_node = (id: string): DecisionNode | undefined =>
	decision_nodes.find((node) => node.id === id);
