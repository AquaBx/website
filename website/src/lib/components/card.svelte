<script lang="ts">
	import Tag from "./tag.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import FormattedDate from "./FormattedDate.svelte";
	import { m } from "$lib/paraglide/messages";
	import { MapPin, Calendar, ExternalLink } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { cn } from "$lib/utils";

	const { element, ...rest } = $props();

	function monthDiff(d1: Date, d2: Date) {
		let months = (d2.getFullYear() - d1.getFullYear()) * 12;
		months -= d1.getMonth();
		months += d2.getMonth();
		return months <= 0 ? 0 : months;
	}

	let htmlElement: HTMLElement | undefined = $state();
	let intersecting = $state(false);
</script>

<IntersectionObserver once={true} element={htmlElement} bind:intersecting>
	<div
		bind:this={htmlElement}
		class={cn(
			"group relative bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row",
			intersecting
				? "opacity-100 translate-y-0"
				: "opacity-0 translate-y-8",
			rest.class,
		)}
	>
		<div class="flex-1 p-6 md:p-8 flex flex-col gap-4">
			<div class="flex justify-between items-start">
				<div class="flex flex-col gap-1">
					<h3
						class="text-2xl font-bold tracking-tight text-slate-900 transition-colors"
					>
						{#if element.link}
							<a
								target="_blank"
								class="flex items-center gap-2"
								href={element.link}
							>
								{element.id}
								{element.name}
								<Icon
									src={ExternalLink}
									class="size-4 opacity-40  transition-opacity"
								/>
							</a>
						{:else}
							{element.name}
						{/if}
					</h3>

					{#if element.location}
						<div
							class="flex gap-1.5 items-center text-sm text-slate-400 font-medium"
						>
							<Icon src={MapPin} class="size-3.5" />
							<span>{element.location}</span>
						</div>
					{/if}
				</div>

				<div class="hidden sm:flex flex-col items-end gap-1">
					{#each element.dates as date}
						<div
							class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md"
						>
							<Icon src={Calendar} class="size-3" />
							{#if date.start && date.end}
								<FormattedDate date={date.start} /> — <FormattedDate
									date={date.end}
								/>
								{#if element.type === "work"}
									<span class="text-sky-500 ml-1">
										({m.month({
											count:
												monthDiff(
													date.start,
													date.end,
												) + 1,
										})})
									</span>
								{/if}
							{:else if date.start && !date.end}
								<FormattedDate date={date.start} /> — {m.today()}
							{/if}
						</div>
					{/each}
				</div>
			</div>

			{#if element.description}
				<div
					class="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base"
				>
					{@html element.description}
				</div>
			{/if}

			{#if element.categories}
				<div class="flex flex-wrap gap-2 mt-2">
					{#each Object.values(element.categories).flat() as t}
						<Tag icon={t} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</IntersectionObserver>
