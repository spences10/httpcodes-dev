<script lang="ts">
	import Details from '$lib/components/details.svelte'
	import { codes } from '$lib/utils'

	let search = ''
	$: filteredCodes = codes.filter(
		item =>
			item.code.toLowerCase().includes(search.toLowerCase()) ||
			item.message.toLowerCase().includes(search.toLowerCase()) ||
			item.detail.toLowerCase().includes(search.toLowerCase()) ||
			item.class.toLowerCase().includes(search.toLowerCase())
	)
</script>

<div
	class="form-control w-full max-w-3xl flex justify-center prose-lg"
>
	<h1 class="mt-8 tracking-wide font-black">Search HTTP Codes</h1>
	<Details
		text="HTTP response status codes indicate whether a specific HTTP
			request has been successfully completed. Responses are grouped
			in five classes:"
	>
		<ol class="list-decimal px-16">
			<li>Informational responses (100 - 199)</li>
			<li>Successful responses (200 - 299)</li>
			<li>Redirection messages (300 - 399)</li>
			<li>Client error responses (400 - 499)</li>
			<li>Server error responses (500 - 599)</li>
		</ol>
	</Details>

	<div class="my-4">
		<label for="search" class="label">
			<span class="label-text text-primary">
				Search codes, message, detail or class
			</span>
		</label>
		<input
			name="search"
			class="input input-lg input-bordered w-full max-w-3xl text-xl"
			type="text"
			placeholder="Search codes, message, detail or class"
			bind:value={search}
		/>
	</div>
	{#if search.length > 0}
		{#each filteredCodes as code}
			<pre>{JSON.stringify(code, null, 2)}</pre>
		{/each}
	{/if}

	<p>
		This list of codes is taken from the <a
			href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
			class="link link-primary"
		>
			MDN Web Docs
		</a>
		.
	</p>
	<p>
		The status codes are defined by <a
			href="https://httpwg.org/specs/rfc9110.html#overview.of.status.codes"
			class="link link-primary"
		>
			RFC 9110
		</a>
		.
	</p>
</div>
