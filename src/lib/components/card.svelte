<script lang="ts">
	import Tag from "./tag.svelte";
	import IntersectionObserver from "svelte-intersection-observer";
	import FormattedDate from "./FormattedDate.svelte";
	import { m } from "$lib/paraglide/messages";
	import { MapPin, Calendar, Link } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
	const { element } = $props();

	function monthDiff(d1, d2) {
		var months;
		months = (d2.getFullYear() - d1.getFullYear()) * 12;
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
		class="{intersecting
			? 'inview'
			: ''} bg-white/10 border-3 border-white/10 flex-1 my-4 py-4 *:px-4 flex flex-col rounded-2xl text-white"
	>
		<h3 class="text-2xl">
			{#if element.link}
				<a
					target="blank"
					class="hover:underline flex items-center gap-1"
					href={element.link}
				>
					{@html element.name}
					<Icon src={Link} class="size-4" />
				</a>
			{:else}
				{@html element.name}
			{/if}
		</h3>

		{#if element.location}
			<div class="flex gap-2 items-center text-xs">
				<Icon src={MapPin} class="size-4" />
				<div>
					{element.location}
				</div>
			</div>
		{/if}
		<div class="flex gap-2 items-center text-xs">
			<Icon src={Calendar} class="size-4" />
			<div>
				{#each element.dates as date}
					<div>
						{#if date.start && date.end}
							<FormattedDate date={date.start} /> - <FormattedDate
								date={date.end}
							/>
							{#if element.type == "work"}
								({m.month({
									count: monthDiff(date.start, date.end) + 1,
								})})
							{/if}
						{:else if date.start && !date.end}
							<FormattedDate date={date.start} /> - {m.today()}
						{/if}
					</div>
				{/each}
			</div>
		</div>

		{#if element.description || element.categories}
			<hr class="border-t-4 border-white/10 my-4" />
		{/if}

		{#if element.description}
			<div>
				{@html element.description.split("\n").join("<br>")}
			</div>
		{/if}

		{#if element.description && element.categories}
			<hr class="border-t-0 border-white/10 mt-4" />
		{/if}

		{#if element.categories}
			<div class="block">
				{#each Object.values(element.categories).sort() as c}
					{#each c as t}
						<Tag icon={t} />
					{/each}
				{/each}
			</div>
		{/if}
	</div>
</IntersectionObserver>
