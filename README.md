# HTTPCodes.dev

HTTP status codes, explained bluntly.

- 1xx: hold on
- 2xx: here you go
- 3xx: go away
- 4xx: you messed up
- 5xx: we messed up

Reference data from
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and
[RFC 9110](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes).

## Develop

```sh
pnpm install
pnpm dev
```

## Scripts

- `pnpm check` - format, lint and type check
- `pnpm format` - fix formatting and lint issues
- `pnpm test:ci` - client, SSR and server tests
- `pnpm coverage` - tests with coverage
- `pnpm test:e2e` - Playwright end-to-end tests
