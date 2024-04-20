<script lang="ts">
	import { page } from '$app/stores';
	import { Details } from '$lib/components';
	import { codes } from '$lib/utils';
	import { Head } from 'svead';

	let search_query = $state('');
	let filtered_codes = $derived.by(() => {
		if (search_query.length === 0) return codes;
		return codes.filter(
			(item) =>
				item.code
					.toLowerCase()
					.includes(search_query.toLowerCase()) ||
				item.message
					.toLowerCase()
					.includes(search_query.toLowerCase()) ||
				item.detail
					.toLowerCase()
					.includes(search_query.toLowerCase()) ||
				item.class.toLowerCase().includes(search_query.toLowerCase())
		);
	});

	let title = 'Search HTTP codes';
	let description =
		'Search HTTP codes for detail information from MDN.';
	let url = $page.url.toString();
</script>

<Head {title} {description} {url} />

<div class="form-control flex w-full max-w-3xl justify-center">
	<h1 class="mt-8 text-5xl font-black tracking-wide text-primary">
		Search HTTP Codes
	</h1>
	<p class="mb-8 font-black tracking-wide text-primary">
		Just search
	</p>

	<div class="my-4">
		<label for="search" class="label">
			<span class="label-text text-primary">
				Search codes, message, detail or class
			</span>
		</label>
		<input
			name="search"
			class="input input-lg input-bordered input-primary mb-6 w-full max-w-3xl border-2 text-xl shadow-xl"
			type="text"
			placeholder="Search codes, message, detail or class"
			bind:value={search_query}
		/>
	</div>
	{#if search_query.length > 0}
		{#each filtered_codes as { code, message, detail, class: informationClass }}
			<section class="mb-10 p-6 shadow-xl outline outline-base-300">
				<h2 class="text-bold mt-1 text-3xl tracking-wide">
					<code>{code} {message}</code>
				</h2>
				<p class="mb-3 text-base text-primary">{informationClass}</p>
				<p class="text-lg">{detail}</p>
			</section>
		{/each}
	{/if}

	<Details
		text="HTTP response status codes indicate whether a specific HTTP
			request has been successfully completed. Responses are grouped
			in five classes:"
	>
		<ol class="list-decimal px-20">
			<li>Informational responses (100 - 199)</li>
			<li>Successful responses (200 - 299)</li>
			<li>Redirection messages (300 - 399)</li>
			<li>Client error responses (400 - 499)</li>
			<li class="pb-5">Server error responses (500 - 599)</li>
		</ol>
	</Details>

	<p class="mb-0">
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
