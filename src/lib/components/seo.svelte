<script lang="ts">
	import { SITE_NAME, SITE_URL } from '#lib/site.js';
	import {
		Head,
		SchemaOrg,
		type SchemaOrgProps,
		type SeoConfig,
	} from 'svead';

	interface Props {
		title: string;
		description: string;
		/** Site-relative path, used for the canonical URL */
		path: string;
		/** File name in static/og, without the extension */
		image?: string;
		image_alt?: string;
	}

	let {
		title,
		description,
		path,
		image = 'home',
		image_alt = 'HTTP status classes, translated: 1xx hold on, 2xx here you go, 3xx go away, 4xx you fucked up, 5xx we fucked up.',
	}: Props = $props();

	const website_id = `${SITE_URL}/#website`;

	let url = $derived(path === '/' ? SITE_URL : `${SITE_URL}${path}`);

	let seo_config = $derived<SeoConfig>({
		title,
		description,
		url,
		website: new URL(SITE_URL).host,
		open_graph_image: `${SITE_URL}/og/${image}.png`,
		open_graph_image_alt: image_alt,
		language: 'en_GB',
		site_name: SITE_NAME,
	});

	let schema = $derived([
		{
			'@type': 'WebSite',
			'@id': website_id,
			url: SITE_URL,
			name: SITE_NAME,
			inLanguage: 'en-GB',
		},
		{
			'@type': 'WebPage',
			'@id': url,
			url,
			name: title,
			description,
			isPartOf: { '@id': website_id },
			inLanguage: 'en-GB',
		},
	] as unknown as SchemaOrgProps['schema']);
</script>

<Head {seo_config} />
<SchemaOrg {schema} />

<svelte:head>
	<!-- Every image in static/og is 1200x630 -->
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
</svelte:head>
