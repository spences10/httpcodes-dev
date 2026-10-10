export type ClassDigit = 1 | 2 | 3 | 4 | 5;

export type StatusTag =
	| 'webdav'
	| 'deprecated'
	| 'experimental'
	| 'unused';

export interface StatusClass {
	digit: ClassDigit;
	label: `${ClassDigit}xx`;
	name: string;
	blunt: string;
}

export interface StatusCode {
	code: number;
	message: string;
	/** The meme translation. */
	blunt: string;
	/** The proper meaning, paraphrased from MDN and RFC 9110. */
	detail: string;
	class: ClassDigit;
	tags?: StatusTag[];
}

export const classes: StatusClass[] = [
	{ digit: 1, label: '1xx', name: 'Informational', blunt: 'Hold on' },
	{
		digit: 2,
		label: '2xx',
		name: 'Successful',
		blunt: 'Here you go',
	},
	{ digit: 3, label: '3xx', name: 'Redirection', blunt: 'Go away' },
	{
		digit: 4,
		label: '4xx',
		name: 'Client error',
		blunt: 'You fucked up',
	},
	{
		digit: 5,
		label: '5xx',
		name: 'Server error',
		blunt: 'We fucked up',
	},
];

export const codes: StatusCode[] = [
	{
		code: 100,
		message: 'Continue',
		blunt: 'Yeah, yeah, keep going.',
		detail:
			'Interim response: everything so far is fine, so the client should carry on with the request, or ignore this if it has already finished.',
		class: 1,
	},
	{
		code: 101,
		message: 'Switching Protocols',
		blunt: "Fine, we'll do it your way.",
		detail:
			'Sent in response to an Upgrade request header, naming the protocol the server is switching to.',
		class: 1,
	},
	{
		code: 102,
		message: 'Processing',
		blunt: "I'm working on it, stop asking.",
		detail:
			'The server has received the request and is processing it, but has no response available yet.',
		class: 1,
		tags: ['webdav', 'deprecated'],
	},
	{
		code: 103,
		message: 'Early Hints',
		blunt: 'Start loading this shit while I sort the rest.',
		detail:
			'Mainly used with the Link header so the user agent can start preloading resources while the server prepares the real response.',
		class: 1,
	},
	{
		code: 200,
		message: 'OK',
		blunt: 'Here you go.',
		detail:
			'The request succeeded. What "success" means depends on the method: GET returns the resource, HEAD returns only the headers, PUT or POST return the result of the action.',
		class: 2,
	},
	{
		code: 201,
		message: 'Created',
		blunt: 'Made it. Happy now?',
		detail:
			'The request succeeded and a new resource was created. Typically the response to a POST, or some PUT requests.',
		class: 2,
	},
	{
		code: 202,
		message: 'Accepted',
		blunt: "Got it. I'll get to it. Maybe.",
		detail:
			'The request has been received but not acted on yet. It is noncommittal: HTTP has no way to send the outcome later. Meant for work handled by another process, or batch jobs.',
		class: 2,
	},
	{
		code: 203,
		message: 'Non-Authoritative Information',
		blunt: 'Here you go, but I got it from some other guy.',
		detail:
			'The returned metadata is not exactly what the origin server has; it came from a local or third-party copy. Mostly used by mirrors and transforming proxies.',
		class: 2,
	},
	{
		code: 204,
		message: 'No Content',
		blunt: 'Done. Nothing to say about it.',
		detail:
			'The request succeeded and there is no body to send, though the headers may still be useful.',
		class: 2,
	},
	{
		code: 205,
		message: 'Reset Content',
		blunt: 'Done. Now clear your damn form.',
		detail:
			'Tells the user agent to reset the document that sent the request.',
		class: 2,
	},
	{
		code: 206,
		message: 'Partial Content',
		blunt: "Here's the bit you asked for.",
		detail:
			'Sent when the client used the Range header to ask for only part of a resource.',
		class: 2,
	},
	{
		code: 207,
		message: 'Multi-Status',
		blunt: "It's complicated.",
		detail:
			'Carries information about multiple resources, for when several status codes might apply at once.',
		class: 2,
		tags: ['webdav'],
	},
	{
		code: 208,
		message: 'Already Reported',
		blunt: 'I already told you about that one.',
		detail:
			'Used inside a <dav:propstat> element to avoid listing the members of multiple bindings to the same collection again.',
		class: 2,
		tags: ['webdav'],
	},
	{
		code: 226,
		message: 'IM Used',
		blunt: "Here's just what changed.",
		detail:
			'The server fulfilled a GET and the response is the result of one or more instance manipulations (HTTP delta encoding) applied to the current instance.',
		class: 2,
	},
	{
		code: 300,
		message: 'Multiple Choices',
		blunt: "Pick one, I'm not doing it for you.",
		detail:
			'The request has more than one possible response and the user agent or user should choose. There is no standard way to choose.',
		class: 3,
	},
	{
		code: 301,
		message: 'Moved Permanently',
		blunt: "Doesn't live here any more. Stop coming round.",
		detail:
			'The URL of the resource has changed for good. The new URL is given in the response.',
		class: 3,
	},
	{
		code: 302,
		message: 'Found',
		blunt: "It's over there. For now.",
		detail:
			'The URI has changed temporarily, so the client should keep using the original URI in future. Clients may change the method to GET; use 307 if that matters.',
		class: 3,
	},
	{
		code: 303,
		message: 'See Other',
		blunt: 'Go look over there instead.',
		detail:
			'Directs the client to fetch the result from another URI with a GET request.',
		class: 3,
	},
	{
		code: 304,
		message: 'Not Modified',
		blunt: "Nothing's changed. Use what you've got.",
		detail:
			'Used for caching: the response has not been modified, so the client can keep using its cached copy.',
		class: 3,
	},
	{
		code: 305,
		message: 'Use Proxy',
		blunt: "Talk to my guy. Actually, don't.",
		detail:
			'Said the resource must be accessed through a proxy. Deprecated because configuring a proxy in-band is a security problem.',
		class: 3,
		tags: ['deprecated'],
	},
	{
		code: 306,
		message: 'Unused',
		blunt: "We don't talk about this one.",
		detail:
			'No longer used, just reserved. It appeared in an earlier version of the HTTP/1.1 specification.',
		class: 3,
		tags: ['unused'],
	},
	{
		code: 307,
		message: 'Temporary Redirect',
		blunt: "It's over there for now. Ask the same way.",
		detail:
			'Like 302, except the client must not change the method: a POST stays a POST on the second request.',
		class: 3,
	},
	{
		code: 308,
		message: 'Permanent Redirect',
		blunt: "It's over there forever. Ask the same way.",
		detail:
			'Like 301, except the client must not change the method: a POST stays a POST on the second request.',
		class: 3,
	},
	{
		code: 400,
		message: 'Bad Request',
		blunt: 'What the fuck is this?',
		detail:
			'The server cannot or will not process the request because of something it sees as a client error: malformed syntax, invalid framing, or deceptive routing.',
		class: 4,
	},
	{
		code: 401,
		message: 'Unauthorized',
		blunt: 'Who the fuck are you?',
		detail:
			'Despite the name, this means unauthenticated: the client must authenticate itself to get the response.',
		class: 4,
	},
	{
		code: 402,
		message: 'Payment Required',
		blunt: 'Fuck you, pay me.',
		detail:
			'Reserved for future use. It was meant for digital payment systems, but it is rarely used and has no standard convention.',
		class: 4,
		tags: ['experimental'],
	},
	{
		code: 403,
		message: 'Forbidden',
		blunt: 'I know exactly who you are. No.',
		detail:
			"The client does not have access rights to the content, so the server refuses. Unlike 401, the client's identity is known.",
		class: 4,
	},
	{
		code: 404,
		message: 'Not Found',
		blunt: 'Never heard of it.',
		detail:
			'The server cannot find the resource. In a browser the URL is not recognised; in an API the endpoint may be valid but the resource does not exist. Also sent instead of 403 to hide that something exists.',
		class: 4,
	},
	{
		code: 405,
		message: 'Method Not Allowed',
		blunt: "You can't do that here.",
		detail:
			'The server knows the request method but the target resource does not support it, such as DELETE on something that cannot be deleted.',
		class: 4,
	},
	{
		code: 406,
		message: 'Not Acceptable',
		blunt: "I've got nothing you'd like.",
		detail:
			'After content negotiation, the server has nothing that matches the criteria the user agent sent.',
		class: 4,
	},
	{
		code: 407,
		message: 'Proxy Authentication Required',
		blunt: 'The bouncer wants to see your ID first.',
		detail:
			'Like 401, but the authentication has to be done by a proxy.',
		class: 4,
	},
	{
		code: 408,
		message: 'Request Timeout',
		blunt: "You took too long. I'm hanging up.",
		detail:
			'The server wants to shut down an idle connection. Some servers send it without any prior request, and some just close the connection without saying anything.',
		class: 4,
	},
	{
		code: 409,
		message: 'Conflict',
		blunt: "That doesn't fit with what I've already got.",
		detail:
			'The request conflicts with the current state of the server, such as an edit based on a stale version.',
		class: 4,
	},
	{
		code: 410,
		message: 'Gone',
		blunt: "It's dead. It's not coming back.",
		detail:
			'The content has been permanently deleted with no forwarding address. Clients should remove their caches and links to it.',
		class: 4,
	},
	{
		code: 411,
		message: 'Length Required',
		blunt: 'Tell me how big it is first.',
		detail:
			'The server rejected the request because it requires a Content-Length header and none was sent.',
		class: 4,
	},
	{
		code: 412,
		message: 'Precondition Failed',
		blunt: "Your 'only if' didn't hold up.",
		detail:
			'The client set preconditions in its headers that the server does not meet.',
		class: 4,
	},
	{
		code: 413,
		message: 'Content Too Large',
		blunt: "That's too fucking big.",
		detail:
			'The request body is larger than the server allows. The server may close the connection or send a Retry-After header.',
		class: 4,
	},
	{
		code: 414,
		message: 'URI Too Long',
		blunt: "I'm not reading all that.",
		detail:
			'The URI requested by the client is longer than the server is willing to interpret.',
		class: 4,
	},
	{
		code: 415,
		message: 'Unsupported Media Type',
		blunt: "I don't speak that.",
		detail:
			'The server does not support the media format of the request body, so it is rejecting the request.',
		class: 4,
	},
	{
		code: 416,
		message: 'Range Not Satisfiable',
		blunt: "There's nothing at that bit.",
		detail:
			"The range given in the Range header cannot be fulfilled, usually because it is outside the size of the target resource's data.",
		class: 4,
	},
	{
		code: 417,
		message: 'Expectation Failed',
		blunt: 'Lower your expectations.',
		detail:
			'The server cannot meet the expectation given in the Expect request header.',
		class: 4,
	},
	{
		code: 418,
		message: "I'm a teapot",
		blunt: "I'm a fucking teapot.",
		detail:
			'The server refuses the attempt to brew coffee with a teapot.',
		class: 4,
	},
	{
		code: 421,
		message: 'Misdirected Request',
		blunt: 'Wrong house, mate.',
		detail:
			'The request went to a server that cannot produce a response for that combination of scheme and authority.',
		class: 4,
	},
	{
		code: 422,
		message: 'Unprocessable Content',
		blunt: 'I can read it. It just makes no sense.',
		detail:
			'The request was well formed but could not be followed because of semantic errors, such as failed validation.',
		class: 4,
	},
	{
		code: 423,
		message: 'Locked',
		blunt: 'Someone else has it. Hands off.',
		detail: 'The resource being accessed is locked.',
		class: 4,
		tags: ['webdav'],
	},
	{
		code: 424,
		message: 'Failed Dependency',
		blunt: 'The last thing you asked for failed, so this did too.',
		detail:
			'The request failed because a previous request it depended on failed.',
		class: 4,
		tags: ['webdav'],
	},
	{
		code: 425,
		message: 'Too Early',
		blunt: 'Slow down, we just met.',
		detail:
			'The server is unwilling to risk processing a request that might be replayed.',
		class: 4,
	},
	{
		code: 426,
		message: 'Upgrade Required',
		blunt: 'Not until you upgrade that old shit.',
		detail:
			'The server refuses the request on the current protocol but might accept it after the client upgrades. The Upgrade header names the required protocols.',
		class: 4,
	},
	{
		code: 428,
		message: 'Precondition Required',
		blunt: "Say 'only if' or I'm not doing it.",
		detail:
			'The server requires the request to be conditional, to prevent lost updates where two clients overwrite each other.',
		class: 4,
	},
	{
		code: 429,
		message: 'Too Many Requests',
		blunt: 'Calm the fuck down.',
		detail:
			'The user has sent too many requests in a given amount of time (rate limiting).',
		class: 4,
	},
	{
		code: 431,
		message: 'Request Header Fields Too Large',
		blunt: 'Your headers are too fucking big.',
		detail:
			'The server will not process the request because its header fields are too large. It can be resubmitted with smaller headers.',
		class: 4,
	},
	{
		code: 451,
		message: 'Unavailable For Legal Reasons',
		blunt: "My lawyer says I can't show you that.",
		detail:
			'The resource cannot legally be provided, such as a page censored by a government.',
		class: 4,
	},
	{
		code: 500,
		message: 'Internal Server Error',
		blunt: 'We fucked up.',
		detail:
			'The server hit a situation it does not know how to handle.',
		class: 5,
	},
	{
		code: 501,
		message: 'Not Implemented',
		blunt: 'We never built that.',
		detail:
			'The server does not support the request method. Only GET and HEAD are required, so those must never return this.',
		class: 5,
	},
	{
		code: 502,
		message: 'Bad Gateway',
		blunt: 'The guy behind me fucked up.',
		detail:
			'The server, acting as a gateway, got an invalid response from the upstream server.',
		class: 5,
	},
	{
		code: 503,
		message: 'Service Unavailable',
		blunt: "Not now. We're fucked.",
		detail:
			'The server is not ready to handle the request, usually because it is down for maintenance or overloaded. Should be temporary, ideally with a Retry-After header.',
		class: 5,
	},
	{
		code: 504,
		message: 'Gateway Timeout',
		blunt: "The guy behind me isn't answering.",
		detail:
			'The server, acting as a gateway, did not get a response from the upstream server in time.',
		class: 5,
	},
	{
		code: 505,
		message: 'HTTP Version Not Supported',
		blunt: "We don't speak that version.",
		detail:
			'The HTTP version used in the request is not supported by the server.',
		class: 5,
	},
	{
		code: 506,
		message: 'Variant Also Negotiates',
		blunt: 'We configured ourselves into a circle.',
		detail:
			'An internal configuration error: the chosen variant is itself set up to do content negotiation, so it is not a proper end point.',
		class: 5,
	},
	{
		code: 507,
		message: 'Insufficient Storage',
		blunt: "We're out of room.",
		detail:
			'The server cannot store the representation needed to complete the request.',
		class: 5,
		tags: ['webdav'],
	},
	{
		code: 508,
		message: 'Loop Detected',
		blunt: "We're going round in fucking circles.",
		detail:
			'The server detected an infinite loop while processing the request.',
		class: 5,
		tags: ['webdav'],
	},
	{
		code: 510,
		message: 'Not Extended',
		blunt: "We'd need more from you. Nobody uses this.",
		detail:
			'Further extensions to the request are required for the server to fulfil it.',
		class: 5,
		tags: ['deprecated'],
	},
	{
		code: 511,
		message: 'Network Authentication Required',
		blunt: 'Sign in to the wifi first.',
		detail:
			'The client needs to authenticate to gain network access. Used by captive portals, like wifi that makes you accept terms first.',
		class: 5,
	},
];

export const get_class = (digit: ClassDigit): StatusClass =>
	classes.find((item) => item.digit === digit)!;

export const get_code = (code: number): StatusCode | undefined =>
	codes.find((item) => item.code === code);

export const search_codes = (query: string): StatusCode[] => {
	const needle = query.trim().toLowerCase();
	if (!needle) return codes;

	// 4xx, 5xx: a whole class
	const class_match = /^([1-5])xx$/.exec(needle);
	if (class_match) {
		const digit = Number(class_match[1]);
		return codes.filter((item) => item.class === digit);
	}

	// Digits only: match the start of the code, so "40" finds 400-409
	if (/^\d+$/.test(needle)) {
		return codes.filter((item) =>
			String(item.code).startsWith(needle),
		);
	}

	return codes.filter((item) =>
		[
			item.message,
			item.blunt,
			item.detail,
			get_class(item.class).name,
			...(item.tags ?? []),
		].some((field) => field.toLowerCase().includes(needle)),
	);
};
