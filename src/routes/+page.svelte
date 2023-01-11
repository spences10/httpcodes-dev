<script lang="ts">
	import { codes } from '$lib/utils'

	let search = ''
	$: filteredCodes = codes.filter(item =>
		item.code.toLowerCase().includes(search.toLowerCase()) ||
    item.message.toLowerCase().includes(search.toLowerCase()) ||
    item.detail.toLowerCase().includes(search.toLowerCase()) ||
    item.class.toLowerCase().includes(search.toLowerCase()) 
	)
</script>

<input type="text" bind:value={search} />
{#each filteredCodes as code}
	<pre>{JSON.stringify(code, null, 2)}</pre>
{/each}
