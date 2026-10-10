<script lang="ts">
	import { search_codes } from '#lib/data/codes.js';
	import { class_bg } from './styles.js';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	interface Entry {
		id: string;
		href: string;
		/** Shown large on the left: a code, or nothing for a page. */
		code?: number;
		title: string;
		note: string;
		colour: string;
	}

	const pages: Entry[] = [
		{
			id: 'palette-page-home',
			href: '/',
			title: 'All codes',
			note: 'Every status code, grouped by class',
			colour: 'bg-black text-white',
		},
		{
			id: 'palette-page-which',
			href: '/which',
			title: 'Which code do I return?',
			note: 'Answer a couple of questions and find out',
			colour: 'bg-black text-white',
		},
	];

	let dialog: HTMLDialogElement | undefined = $state();
	let input: HTMLInputElement | undefined = $state();
	let query = $state('');
	let active = $state(0);

	let entries = $derived.by((): Entry[] => {
		const needle = query.trim().toLowerCase();
		const matching_pages = pages.filter(
			(page) => !needle || page.title.toLowerCase().includes(needle),
		);
		const matching_codes = search_codes(query).map((item) => ({
			id: `palette-code-${item.code}`,
			href: `/${item.code}`,
			code: item.code,
			title: item.message,
			note: item.blunt,
			colour: class_bg[item.class],
		}));
		// Pages first when browsing, codes first when searching.
		return needle
			? [...matching_codes, ...matching_pages]
			: [...matching_pages, ...matching_codes];
	});

	let active_entry = $derived(entries[active]);

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			query = '';
			active = 0;
			dialog.showModal();
			input?.focus();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});

	const move = (to: number) => {
		if (entries.length === 0) return;
		active = (to + entries.length) % entries.length;
		document
			.getElementById(entries[active].id)
			?.scrollIntoView({ block: 'nearest' });
	};

	const on_window_keydown = (event: KeyboardEvent) => {
		if (
			(event.ctrlKey || event.metaKey) &&
			event.key.toLowerCase() === 'k'
		) {
			event.preventDefault();
			open = !open;
		}
	};

	const on_input_keydown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			move(active + 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			move(active - 1);
		} else if (event.key === 'Home') {
			event.preventDefault();
			move(0);
		} else if (event.key === 'End') {
			event.preventDefault();
			move(entries.length - 1);
		} else if (event.key === 'Enter' && active_entry) {
			event.preventDefault();
			// Click the link so the router handles it like any other.
			document.getElementById(active_entry.id)?.click();
		}
	};
</script>

<svelte:window onkeydown={on_window_keydown} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	aria-label="Search status codes"
	onclose={() => (open = false)}
	onclick={(event) => {
		// A click on the backdrop lands on the dialog element itself.
		if (event.target === dialog) open = false;
	}}
	class="m-auto mt-[10vh] w-[min(44rem,calc(100vw-2rem))] max-w-none border-4 border-black bg-white p-0 font-sans text-black shadow-hard backdrop:bg-black/70"
>
	{#if open}
		<div class="flex max-h-[min(34rem,75vh)] flex-col">
			<div
				class="flex items-center gap-3 border-b-4 border-black p-3"
			>
				<input
					bind:this={input}
					bind:value={query}
					oninput={() => (active = 0)}
					onkeydown={on_input_keydown}
					type="text"
					role="combobox"
					aria-label="Search by number, name or insult"
					aria-expanded="true"
					aria-controls="palette-results"
					aria-autocomplete="list"
					aria-activedescendant={active_entry?.id}
					autocomplete="off"
					spellcheck="false"
					placeholder="404, teapot, redirect, 5xx"
					class="min-w-0 flex-1 bg-white px-2 py-1 text-2xl font-bold placeholder:text-neutral-500 focus:outline-none"
				/>
				<button
					type="button"
					onclick={() => (open = false)}
					class="border-4 border-black px-2 py-0.5 text-sm font-bold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black"
				>
					Esc
				</button>
			</div>

			{#if entries.length === 0}
				<p class="p-5 text-xl font-bold">
					Nothing matches “{query.trim()}”. Try a number like 404, a
					class like 4xx, or a word like redirect.
				</p>
			{/if}

			<ul
				id="palette-results"
				role="listbox"
				aria-label="Results"
				class="overflow-y-auto overscroll-contain"
			>
				{#each entries as entry, index (entry.id)}
					<li role="presentation">
						<a
							id={entry.id}
							href={entry.href}
							role="option"
							aria-selected={index === active}
							tabindex="-1"
							onclick={() => (open = false)}
							onpointermove={() => (active = index)}
							class="flex items-center gap-4 border-b-2 border-black px-3 py-2 last:border-b-0 {index ===
							active
								? entry.colour
								: ''}"
						>
							{#if entry.code}
								<span
									class="w-24 shrink-0 text-3xl leading-none font-black font-stretch-125%"
									>{entry.code}</span
								>
							{/if}
							<span class="min-w-0">
								<span class="block font-bold">{entry.title}</span>
								<span
									class="block text-lg leading-snug font-extrabold"
									>{entry.note}</span
								>
							</span>
						</a>
					</li>
				{/each}
			</ul>

			<p
				class="flex flex-wrap gap-x-5 border-t-4 border-black px-3 py-2 text-sm font-bold"
				aria-hidden="true"
			>
				<span>↑ ↓ to move</span>
				<span>Enter to open</span>
				<span>Esc to close</span>
			</p>
		</div>
	{/if}
</dialog>
