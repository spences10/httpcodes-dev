<script lang="ts">
	import { create_decision } from '#lib/decision.svelte.js';
	import Plate from './plate.svelte';
	import { focus_ring, white_sign } from './styles.js';

	let { base }: { base: string } = $props();

	const decision = create_decision();
</script>

<h1
	class="mt-8 text-5xl leading-none font-black tracking-tight sm:text-7xl"
>
	Which code do I return?
</h1>
<p class="mt-4 max-w-2xl text-xl">
	Answer a couple of questions about what happened and you will get
	the status code to send back.
</p>

{#if decision.steps.length > 0}
	<ol
		class="mt-8 grid max-w-3xl gap-2"
		aria-label="Your answers so far"
	>
		{#each decision.steps as step (step.question)}
			<li class="text-lg">
				{step.question}
				<strong class="font-extrabold">{step.answer}.</strong>
			</li>
		{/each}
	</ol>
{/if}

<div class="mt-8 max-w-3xl" aria-live="polite">
	{#if decision.result}
		{@const item = decision.result}
		<Plate digit={item.class} class="p-5 sm:p-8">
			<h2 class="text-xl font-bold">Return this</h2>
			<p class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
				<span
					class="rounded-xl border-4 border-black bg-white px-3 pt-2 text-7xl leading-[0.85] font-black text-black"
					>{item.code}</span
				>
				<span class="text-3xl font-extrabold">{item.message}</span>
			</p>
			<p class="mt-4 text-3xl leading-none font-black">
				{item.blunt}
			</p>
			<a
				href="{base}/{item.code}"
				class="{white_sign} mt-6 inline-block px-4 pt-2.5 pb-2 text-lg font-bold hover:bg-neutral-100 {focus_ring}"
			>
				Read about {item.code}
			</a>
		</Plate>
	{:else}
		<h2 class="{white_sign} px-5 pt-4 pb-3 text-3xl font-black">
			{decision.node.question}
		</h2>
		<ul class="mt-4 grid gap-3">
			{#each decision.node.options as option (option.label)}
				<li>
					<button
						type="button"
						onclick={() => decision.choose(option)}
						class="flex w-full items-center justify-between gap-4 rounded-xl bg-signs-info px-5 pt-3.5 pb-3 text-left text-xl font-bold text-white hover:brightness-110 {focus_ring}"
					>
						{option.label}
						<span aria-hidden="true">→</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

{#if decision.can_go_back}
	<p class="mt-8 flex flex-wrap gap-4">
		<button
			type="button"
			onclick={() => decision.back()}
			class="{white_sign} px-4 pt-2.5 pb-2 text-lg font-bold hover:bg-neutral-100 {focus_ring}"
		>
			Back one question
		</button>
		<button
			type="button"
			onclick={() => decision.reset()}
			class="rounded-xl bg-black px-4 pt-2.5 pb-2 text-lg font-bold text-white {focus_ring}"
		>
			Start again
		</button>
	</p>
{/if}
