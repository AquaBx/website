<script lang="ts">
	import FormattedDate from "$lib/components/FormattedDate.svelte";
	import { Calendar } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
	const { post } = $props();
</script>

<div class="flex flex-col gap-1 group p-1">
	<span
		class="font-bold text-sky-900 text-lg leading-tight group-hover:text-sky-700 transition-colors tracking-wide"
		>{post.name}</span
	>

	{#if post.location}
		<span class="text-sm text-sky-600 italic">{post.location}</span>
	{/if}
	{#if post.dates && post.dates.length > 0}
		<div class="flex flex-col flex-wrap gap-1 text-sky-700 text-sm">
			{#each post.dates as d}
				<span class="flex items-center font-mono gap-1">
					<Icon src={Calendar} class="size-4" />
					{#if d.start && d.end}
						<FormattedDate date={d.start} /> – <FormattedDate
							date={d.end}
						/>
					{:else if d.start && !d.end}
						<FormattedDate date={d.start} /> – Aujourd'hui
					{:else if !d.start && d.end}
						<!-- Jusqu'à <FormattedDate date={d.end} /> -->
					{/if}
				</span>
			{/each}
		</div>
	{/if}

	{#if post.description}
		<div class=" text-sky-800">
			{@html post.description.replaceAll("\n", "<br>")}
		</div>
	{/if}
	<!-- <span class="text-sm">
		{#if post.categories}
			{Object.keys(post.categories)
				.map((key) => {
					return key + " : " + post.categories[key].join(", ");
				})
				.join(" —— ")}
		{/if}
	</span> -->
</div>
