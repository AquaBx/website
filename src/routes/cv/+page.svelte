<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import AccordionCat from "./accordionCat.svelte";
	import CV from "$lib/cvjolie/CV.svelte";
	import Title from "$lib/components/Title.svelte";

	let { data } = $props();

	// On utilise $state pour que les modifications (cochage/décochage) soient prises en compte
	let categories = $state([
		{
			title: m.contests(),
			categories: data.contests.map((c) => ({ ...c, shown: true })),
		},
		{
			title: m.projects(),
			categories: data.projects.map((c) => ({ ...c, shown: true })),
		},
		{
			title: m.studies(),
			categories: data.studies.map((c) => ({ ...c, shown: true })),
		},
		{
			title: m.work(),
			categories: data.work.map((c) => ({ ...c, shown: true })),
		},
		{
			title: m.volunteering(),
			categories: data.volunteering.map((c) => ({ ...c, shown: true })),
		},
	]);

	let dataInput = $derived({
		profile: data.profile,
		categories: categories,
	});
</script>

<div class="flex flex-col gap-12 py-12 print:p-0">
	<Title title={m.cv()} />
	<div
		class="flex w-full lg:flex-row flex-col-reverse gap-6 p-6 bg-gray-50 min-h-screen text-black print:p-0 print:bg-white"
	>
		<div class="lg:w-1/3 w-full print:hidden">
			<AccordionCat bind:items={categories}></AccordionCat>
		</div>
		<div
			class="lg:w-2/3 w-full sticky top-6 self-start print:static print:w-full"
		>
			<CV data={dataInput}></CV>
		</div>
	</div>
</div>
