<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import Title from "$lib/components/Title.svelte";
	import { Tabs, Toggle } from "melt/builders";

	let { data } = $props();

	const tabs = new Tabs<string>({ value: "personal" });
	const tabIds = [
		"personal",
		"school",
		"organisations",
		"contributions",
	] as const;

	const showOnlyComplete = new Toggle({ value: true });

	function isSchoolProject(el: any) {
		const login = el.owner.login.toLowerCase();
		return login === "aquabxschool";
	}

	let filteredOwnedProjects = $derived(
		data.ownedProjects.filter(
			(el) => !showOnlyComplete.value || el.complete,
		),
	);

	let filteredOwnedProjectsOrganisation = $derived(
		data.ownedProjectsOrganisation.filter(
			(el) =>
				(!showOnlyComplete.value || el.complete) &&
				!isSchoolProject(el),
		),
	);

	let filteredSchoolProjects = $derived(
		data.ownedProjectsOrganisation.filter(
			(el) =>
				(!showOnlyComplete.value || el.complete) && isSchoolProject(el),
		),
	);

	let filteredContributions = $derived(
		data.contributions.filter(
			(el) => !showOnlyComplete.value || el.complete,
		),
	);
</script>

<div class="flex flex-col gap-12 py-12">
	<Title title={m.projects()} />
	<button
		{...showOnlyComplete.trigger}
		class="px-3 py-1.5 w-30 text-xs font-medium border rounded-lg transition-all focus:outline-none bg-background hover:bg-slate-50 border-slate-200 text-slate-700 data-checked:bg-slate-900 data-checked:text-slate-50 data-checked:border-slate-900"
	>
		{m.completed_only()}
	</button>

	<div>
		<div
			{...tabs.triggerList}
			class="flex border-b border-slate-100 gap-6 mb-8"
		>
			{#each tabIds as id}
				<button
					{...tabs.getTrigger(id)}
					class="pb-4 px-1 text-sm font-medium border-b-2 border-transparent transition-all focus:outline-none data-[state=active]:border-slate-900 data-[state=active]:text-slate-900 text-slate-400 hover:text-slate-900"
				>
					{#if id === "personal"}
						{m.owned_projects()}
					{:else if id === "school"}
						{m.school_projects()}
					{:else if id === "organisations"}
						{m.organisation_projects()}
					{:else}
						{m.contributions()}
					{/if}
				</button>
			{/each}
		</div>

		<div
			{...tabs.getContent("personal")}
			class="grid grid-cols-1 gap-6 lg:gap-8"
		>
			{#each filteredOwnedProjects as element}
				<Card {element} class="h-full border-slate-100"></Card>
			{/each}
		</div>

		<div
			{...tabs.getContent("school")}
			class="grid grid-cols-1 gap-6 lg:gap-8"
		>
			{#each filteredSchoolProjects as element}
				<Card {element} class="h-full border-slate-100"></Card>
			{/each}
		</div>

		<div
			{...tabs.getContent("organisations")}
			class="grid grid-cols-1 gap-6 lg:gap-8"
		>
			{#each filteredOwnedProjectsOrganisation as element}
				<Card {element} class="h-full border-slate-100"></Card>
			{/each}
		</div>

		<div
			{...tabs.getContent("contributions")}
			class="grid grid-cols-1 gap-6 lg:gap-8"
		>
			{#each filteredContributions as element}
				<Card {element} class="h-full border-slate-100"></Card>
			{/each}
		</div>
	</div>
</div>
