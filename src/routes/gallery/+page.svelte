<script lang="ts">
	import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { m } from "$lib/paraglide/messages.js";

	let { data } = $props();
	let { items } = data;
    let htmlElement: HTMLElement | undefined = $state();
    let intersecting = $state(false);


</script>

	<h1 class="text-5xl font-semibold text-white text-center">{m.gallery()}</h1>
<div class="block columns-[3_300px] gap-0">
	{#each items as post}
		<div class="m-2 inline-block">
			{#if post.sources.length > 1}
				<Carousel.Root
					class="w-full rounded-xl overflow-hidden"
				>
					<Carousel.Content>
						{#each post.sources as src}
							<Carousel.Item>
								<enhanced:img
									class="rounded-xl w-full"
									{src}
									alt="picture"
									sizes="(max-width:431px) 1280px, (max-width:631px) 800px, (min-width:632px) 400px"
								/>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous class="left-1" />
					<Carousel.Next class="right-1" />
				</Carousel.Root>
			{:else}
				<enhanced:img
					class="rounded-xl w-full"
					src={post.sources[0]}
					alt="picture"
					sizes="(max-width:431px) 1280px, (max-width:631px) 800px, (min-width:632px) 400px"
				/>
			{/if}
		</div>
	{/each}
</div>