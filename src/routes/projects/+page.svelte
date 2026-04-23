<script>
	import Card from "$lib/components/card.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import Title from "$lib/components/Title.svelte";
	let { data } = $props();
</script>

<div class="flex flex-col gap-12 py-12">
	<Title title={m.projects()} />

	<div class="grid grid-cols-1 gap-6 lg:gap-8">
		{#each data.projects as element}
			<Card {element} class="h-full border-slate-100"></Card>
		{/each}
	</div>
</div>
