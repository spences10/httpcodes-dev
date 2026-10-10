export interface Confusion {
	codes: number[];
	question: string;
	answer: string;
}

export const confusions: Confusion[] = [
	{
		codes: [401, 403],
		question: 'Not logged in, or not allowed?',
		answer:
			"401 means the server doesn't know who you are: log in and try again. 403 means it knows exactly who you are and the answer is still no, so logging in again won't help.",
	},
	{
		codes: [403, 404],
		question: 'Forbidden, or pretending it is not there?',
		answer:
			'403 admits the thing exists but refuses to hand it over. 404 says there is nothing here, and servers also use it to hide things from people who are not allowed to know they exist.',
	},
	{
		codes: [404, 410],
		question: 'Missing, or gone for good?',
		answer:
			'404 makes no promise either way: it might turn up later. 410 is deliberate: it was here, it has been removed, and it is not coming back, so stop asking and drop your links.',
	},
	{
		codes: [400, 422],
		question: "Can't read it, or read it and it's wrong?",
		answer:
			'400 is for a request the server cannot even parse: broken JSON, bad framing. 422 is for one that parses fine but fails the rules, like a missing required field or an end date before the start date.',
	},
	{
		codes: [301, 308],
		question: 'Which permanent redirect?',
		answer:
			'Both mean moved for good. With 301, clients are allowed to turn a POST into a GET when they follow it. 308 forbids that: the method and body stay the same.',
	},
	{
		codes: [302, 303, 307],
		question: 'Which temporary redirect?',
		answer:
			'302 is the vague old one: clients may or may not switch to GET. 303 says always follow with a GET, which is what you want after a form POST. 307 says keep the same method and body.',
	},
	{
		codes: [301, 302],
		question: 'Permanent or temporary?',
		answer:
			'301 tells browsers and search engines to update their records and stop asking for the old URL, and they will cache it hard. 302 says keep using the old URL because this is only for now.',
	},
	{
		codes: [200, 204],
		question: 'Is there a body?',
		answer:
			'Both mean it worked. 200 comes with something to read. 204 comes with nothing, on purpose, and a client must not expect a body.',
	},
	{
		codes: [201, 202],
		question: 'Done, or just queued?',
		answer:
			'201 means the new thing exists right now. 202 means the request was accepted but the work has not happened yet, and it might still fail later.',
	},
	{
		codes: [405, 501],
		question: 'Not allowed here, or not built at all?',
		answer:
			'405 means the server understands the method but this resource does not take it. 501 means the server does not support that method anywhere.',
	},
	{
		codes: [409, 412],
		question: 'Which kind of clash?',
		answer:
			'409 means the request conflicts with the current state, such as creating something that already exists. 412 means the client sent a condition like If-Match and it turned out to be false.',
	},
	{
		codes: [429, 503],
		question: 'Is it you, or is it us?',
		answer:
			'429 blames the client: you personally are sending too much. 503 blames the server: it is overloaded or down for everyone.',
	},
	{
		codes: [500, 503],
		question: 'Broken, or just busy?',
		answer:
			'500 means something went wrong that nobody planned for, usually a bug. 503 means the server is knowingly unavailable for now and you should try again later.',
	},
	{
		codes: [502, 504],
		question: 'Bad answer, or no answer?',
		answer:
			'Both come from a proxy or gateway blaming the server behind it. 502 means the upstream replied with rubbish. 504 means it never replied in time.',
	},
];

export const get_confusions = (code: number): Confusion[] =>
	confusions.filter((item) => item.codes.includes(code));
