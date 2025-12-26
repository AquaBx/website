<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import { Carousel } from "@aquabx/uikit";
	import { ChevronLeft, ChevronRight } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
	let { data } = $props();
	let images = $derived(data.items.map(el=>el.images).flat())
</script>

<h1 class="text-5xl font-semibold text-white text-center">{m.gallery()}</h1>




<div class="flex-wrap justify-between flex gap-4">
	{#each data.items as post}
		{#if post.sources.length > 1}

		<Carousel
			images={post.images}
			show={1}
			gap={0}
			class=" max-w-80 w-full  aspect-square rounded-xl overflow-hidden select-none relative"
		>
			{#snippet image({ src, alt })}
				<enhanced:img class="w-full h-full object-cover select-none" draggable="false" {src} {alt} sizes="(max-width:431px) 1280px, (max-width:631px) 800px, (min-width:632px) 400px" />
			{/snippet}
			{#snippet previous(onclick)}
				<button
					{onclick}
					class="z-10 rounded-full p-2 bg-white absolute left-5 top-1/2 -translate-y-1/2"
				>
					<Icon class="size-4" src={ChevronLeft} />
				</button>
			{/snippet}
			{#snippet next(onclick)}
				<button
					{onclick}
					class="z-10 rounded-full p-2 bg-white absolute right-5 top-1/2 -translate-y-1/2"
				>
					<Icon class="size-4" src={ChevronRight} />
				</button>
			{/snippet}
		</Carousel>
		{:else}
			<enhanced:img
					class="rounded-xl w-full max-w-80 object-cover aspect-square"
					src={post.images[0].src}
					alt="picture"
					sizes="(max-width:431px) 1280px, (max-width:631px) 800px, (min-width:632px) 400px"
				/>
		{/if}
	{/each}
</div>