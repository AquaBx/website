<script lang="ts">
	import FormattedDate from "$lib/components/FormattedDate.svelte";
	import { Calendar, MapPin } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
	const { post } = $props();
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between items-start gap-4">
		<h3 class="font-bold text-slate-800 text-base leading-tight">
			{post.name}
		</h3>
		
		{#if post.dates && post.dates.length > 0}
			<div class="flex flex-col items-end shrink-0">
				{#each post.dates as d}
					<span class="text-[11px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
						{#if d.start && d.end}
							<FormattedDate date={d.start} /> – <FormattedDate date={d.end} />
						{:else if d.start && !d.end}
							<FormattedDate date={d.start} /> – Présent
						{/if}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	{#if post.location}
		<div class="flex items-center gap-1 text-[11px] text-sky-600 font-medium">
			<Icon src={MapPin} class="size-3" />
			<span>{post.location}</span>
		</div>
	{/if}

	{#if post.description}
		<div class="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
			{post.description}
		</div>
	{/if}

	{#if post.categories}
		<div class="flex flex-wrap gap-1 mt-1">
			{#each Object.values(post.categories).flat() as tech}
				<span class="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 font-medium">
					{tech}
				</span>
			{/each}
		</div>
	{/if}
</div>
