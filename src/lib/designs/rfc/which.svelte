<script lang="ts">
	import { create_decision } from '#lib/decision.svelte.js';
	import { indent, link, text_button } from './styles.js';

	let { base }: { base: string } = $props();

	const decision = create_decision();
	const letters = 'abcdefgh';
</script>

<h1 class="font-bold">Appendix A.&nbsp; Which Code Do I Return?</h1>
<p class="mt-4 {indent}">
	Answer the questions below about what happened to the request. The
	procedure ends with the status code to send back.
</p>

{#if decision.steps.length > 0}
	<ol class="mt-4 {indent}" aria-label="Your answers so far">
		{#each decision.steps as step, index (step.question)}
			<li class="mt-2">
				A.{index + 1}.&nbsp; {step.question}<br />
				<span class="pl-[6ch] font-bold">{step.answer}.</span>
			</li>
		{/each}
	</ol>
{/if}

<div class="mt-4 {indent}" aria-live="polite">
	{#if decision.result}
		{@const item = decision.result}
		<h2 class="font-bold">
			A.{decision.steps.length + 1}.&nbsp; Result
		</h2>
		<p class="mt-4 pl-[3ch]">
			The server MUST return
			<a class="{link} font-bold" href="{base}/{item.code}"
				>{item.code} {item.message}</a
			>.
		</p>
		<p class="mt-2 pl-[3ch] font-bold">{item.blunt}</p>
	{:else}
		<h2 class="font-bold">
			A.{decision.steps.length + 1}.&nbsp; {decision.node.question}
		</h2>
		<ul class="mt-4 pl-[3ch]">
			{#each decision.node.options as option, index (option.label)}
				<li class="mt-1">
					<button
						type="button"
						class={text_button}
						onclick={() => decision.choose(option)}
					>
						({letters[index]}) {option.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

{#if decision.can_go_back}
	<p class="mt-8 flex flex-wrap gap-x-[4ch] {indent}">
		<button
			type="button"
			class={text_button}
			onclick={() => decision.back()}
		>
			[Back one question]
		</button>
		<button
			type="button"
			class={text_button}
			onclick={() => decision.reset()}
		>
			[Start again]
		</button>
	</p>
{/if}

<p class="mt-10 text-right text-rfc-dim">[Page A-1]</p>
