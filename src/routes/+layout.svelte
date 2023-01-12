<script>
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public'
	import { Footer } from '$lib/components'
	import * as Fathom from 'fathom-client'
	import { onMount } from 'svelte'
	import '../app.css'

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		})
	})

	$: $page.url.pathname, browser && Fathom.trackPageview()
</script>

<main class="container max-w-3xl mx-auto px-4 mb-20 flex-grow">
	<slot />
</main>

<Footer />
