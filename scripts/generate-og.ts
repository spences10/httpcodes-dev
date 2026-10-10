/**
 * Renders the Open Graph images into static/og with Playwright.
 * Run `pnpm og` after changing the codes, classes or card design.
 */
import { mkdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { classes, codes, get_class } from '../src/lib/data/codes.ts';

const WIDTH = 1200;
const HEIGHT = 630;

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out_dir = join(root, 'static/og');

// Keep in step with the class colours in src/app.css.
const class_colours: Record<number, string> = {
	1: '#8ecbff',
	2: '#5fe08a',
	3: '#ffd23f',
	4: '#ff6f4d',
	5: '#c08bff',
};

const font_path = createRequire(import.meta.url).resolve(
	'@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2',
);
const font = (await readFile(font_path)).toString('base64');

const escape_html = (text: string) =>
	text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');

const html_page = (
	body: string,
	background: string,
) => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
	@font-face {
		font-family: 'Archivo';
		src: url(data:font/woff2;base64,${font}) format('woff2-variations');
		font-weight: 100 900;
		font-stretch: 62% 125%;
	}
	* { box-sizing: border-box; margin: 0; }
	body {
		width: ${WIDTH}px;
		height: ${HEIGHT}px;
		padding: 36px 52px 52px 36px;
		background: #fff;
		font-family: 'Archivo', sans-serif;
		color: #000;
	}
	.card {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 36px 44px 32px;
		border: 8px solid #000;
		box-shadow: 16px 16px 0 #000;
		background: ${background};
	}
	.wide { font-weight: 900; font-stretch: 125%; }
	.code { font-size: 210px; line-height: 0.8; }
	.message {
		margin-top: 22px;
		font-size: 44px;
		font-weight: 900;
		line-height: 1;
		white-space: nowrap;
	}
	/* The script shrinks this until the card stops overflowing. */
	.blunt { margin-top: 30px; font-size: 80px; line-height: 0.95; }
	.site { margin-top: auto; padding-top: 16px; font-size: 30px; font-weight: 800; }
	.rows { display: flex; flex-direction: column; gap: 10px; }
	.row {
		display: flex;
		align-items: baseline;
		gap: 28px;
		padding: 4px 24px 6px;
		border: 6px solid #000;
		font-size: 52px;
		line-height: 1;
	}
	.home { padding: 28px 32px 24px; background: #fff; }
	.home .site { font-size: 30px; }
</style>
</head>
<body>${body}</body>
</html>`;

const code_card = (code: number) => {
	const item = codes.find((entry) => entry.code === code)!;
	return html_page(
		`<div class="card">
			<div class="code wide">${item.code}</div>
			<div class="message">${escape_html(item.message)}</div>
			<div class="blunt wide">${escape_html(item.blunt)}</div>
			<div class="site">httpcodes.dev</div>
		</div>`,
		class_colours[get_class(item.class).digit],
	);
};

const home_card = () =>
	html_page(
		`<div class="card home">
			<div class="rows">
				${classes
					.map(
						(status_class) =>
							`<div class="row wide" style="background: ${class_colours[status_class.digit]}">
								<span>${status_class.label}</span>
								<span>${escape_html(status_class.blunt)}</span>
							</div>`,
					)
					.join('')}
			</div>
			<div class="site">httpcodes.dev</div>
		</div>`,
		'#fff',
	);

await mkdir(out_dir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: WIDTH, height: HEIGHT },
});

const render = async (name: string, html: string) => {
	await page.setContent(html);
	await page.evaluate(async () => {
		await document.fonts.ready;
		const card = document.querySelector<HTMLElement>('.card')!;
		const blunt = document.querySelector<HTMLElement>('.blunt');
		if (!blunt) return;
		let size = parseFloat(getComputedStyle(blunt).fontSize);
		while (card.scrollHeight > card.clientHeight && size > 36) {
			size -= 2;
			blunt.style.fontSize = `${size}px`;
		}
	});
	await page.screenshot({ path: join(out_dir, `${name}.png`) });
};

await render('home', home_card());
for (const item of codes) {
	await render(String(item.code), code_card(item.code));
}

await browser.close();
console.log(`Wrote ${codes.length + 1} images to static/og`);
