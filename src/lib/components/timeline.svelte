<script lang="ts">
	import { Icon } from "@steeze-ui/svelte-icon";
	import Card from "./card.svelte";
	import { CATEGORY_STYLES } from "$lib/constants";
	import type { Post } from "$lib/types";

	let { list }: { list: Post[] } = $props();
</script>

<div class="mx-auto flex flex-col relative max-w-4xl">
	<!-- Vertical line -->
	<div
		class="absolute left-5 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2"
	></div>

	{#each list as element}
		{@const choice =
			CATEGORY_STYLES[element.type as keyof typeof CATEGORY_STYLES] ||
			CATEGORY_STYLES.default}
		<div class="relative flex gap-4 mb-12 last:mb-0">
			<!-- Icon / Point -->
			<div class="flex flex-col items-center justify-center z-10">
                <div class="bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                    <Icon
                        src={choice.icon}
                        class="size-8 p-1.5 rounded-full {choice.color.split(
                            ' ',
                        )[0]} {choice.color.split(' ')[1]}"
                    />
                </div>
			</div>

			<Card class="ml-4 flex-1" {element}></Card>
		</div>
	{/each}
</div>
