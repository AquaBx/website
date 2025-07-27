<script>
    import Card from "$lib/components/card.svelte";
    import Timeline from "$lib/components/timeline.svelte";
    import { m } from "$lib/paraglide/messages.js";
    let { data } = $props();
    let { projects } = data;
</script>

<article class="flex flex-col gap-8">
	<h1 class="text-5xl font-semibold text-white text-center">{m.projects()}</h1>

	<div class="flex flex-col gap-4">
		{#each projects as element}
			<Card {element}></Card>
		{/each}
	</div>
</article>