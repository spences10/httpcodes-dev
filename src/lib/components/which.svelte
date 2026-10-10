<script lang="ts">
	import { create_decision } from '#lib/decision.svelte.js';
	import { class_bg, focus_ring, press } from './styles.js';

	const decision = create_decision();
</script>

<h1
	class="mt-10 text-4xl leading-[0.95] font-black [font-stretch:125%] sm:text-6xl"
>
	Which code do I return?
</h1>
<p class="mt-4 max-w-2xl text-lg font-medium">
	Answer a couple of questions about what happened and you will get
	the status code to send back.
</p>

{#if decision.steps.length > 0}
	<ol
		class="mt-8 grid max-w-3xl gap-2"
		aria-label="Your answers so far"
	>
		{#each decision.steps as step (step.question)}
			<li class="border-4 border-black px-4 py-2 font-medium">
				{step.question}
				<strong class="font-black">{step.answer}.</strong>
			</li>
		{/each}
	</ol>
{/if}

<div class="mt-8 max-w-3xl" aria-live="polite">
	{#if decision.result}
		{@const item = decision.result}
		<section
			class="{class_bg[
				item.class
			]} border-4 border-black p-5 shadow-hard sm:p-8"
		>
			<h2 class="text-xl font-bold">Return this</h2>
			<p class="mt-2 flex flex-wrap items-baseline gap-x-5">
				<span
					class="text-8xl leading-[0.85] font-black [font-stretch:125%]"
					>{item.code}</span
				>
				<span class="text-2xl font-black">{item.message}</span>
			</p>
			<p
				class="mt-4 text-3xl leading-none font-black [font-stretch:125%]"
			>
				{item.blunt}
			</p>
			<a
				href="/{item.code}"
				class="mt-6 inline-block border-4 border-black bg-white px-4 py-2 font-bold {press} {focus_ring}"
			>
				Read about {item.code}
			</a>
		</section>
	{:else}
		<h2 class="text-3xl font-black [font-stretch:125%]">
			{decision.node.question}
		</h2>
		<ul class="mt-5 grid gap-3">
			{#each decision.node.options as option (option.label)}
				<li>
					<button
						type="button"
						onclick={() => decision.choose(option)}
						class="w-full border-4 border-black bg-white px-4 py-3 text-left text-xl font-bold hover:bg-class-3 {press} {focus_ring}"
					>
						{option.label}
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
			class="border-4 border-black px-4 py-2 font-bold {press} {focus_ring}"
		>
			Back one question
		</button>
		<button
			type="button"
			onclick={() => decision.reset()}
			class="border-4 border-black bg-black px-4 py-2 font-bold text-white {focus_ring}"
		>
			Start again
		</button>
	</p>
{/if}
