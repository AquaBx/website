<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { m } from "$lib/paraglide/messages";
	import { onMount } from "svelte";
	import AccordionCat from "./accordionCat.svelte";
	import { generatePDF } from "./cv2";
	import CV from "$lib/cvjolie/CV.svelte";
	import { profile } from "$lib/cvjolie/cv";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	let { data } = $props();

	let contests = $state(data.contests);
	let projects = $state(data.projects);
	let studies = $state(data.studies);
	let work = $state(data.work);
	let volunteering = $state(data.volunteering);

	let pdfUri: URL | undefined = $state();

	let onclick = async () => {
		pdfUri = (await generatePDF(
			contests,
			studies,
			work,
			volunteering,
			projects,
		)) as URL;
	};

	onMount(() => {
		onclick();
	});
</script>

<div class="flex w-full md:flex-row flex-col-reverse gap-2 text-white">
	<div class="flex-1">
		<AccordionCat title={m.contests()} bind:data={contests}></AccordionCat>
		<AccordionCat title={m.studies()} bind:data={studies}></AccordionCat>
		<AccordionCat title={m.work()} bind:data={work}></AccordionCat>
		<AccordionCat title={m.volunteering()} bind:data={volunteering}
		></AccordionCat>
		<AccordionCat title={m.projects()} bind:data={projects}></AccordionCat>
		<Button {onclick}>Generate</Button>
	</div>

	<div class="flex h-[75dvh] w-full max-w-[21cm] flex-col gap-6 ">
		<Tabs.Root value="ats">
			<Tabs.List>
				<Tabs.Trigger value="ats">ATS</Tabs.Trigger>
				<Tabs.Trigger value="joli">Joli</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="ats" 
			>
				<iframe
					title="pdf"
					class="h-[75dvh] w-full"
					
					src={pdfUri as any as string}
				></iframe>
			</Tabs.Content>
			<Tabs.Content value="joli">
				<CV
					data={{
						contests,
						projects,
						studies,
						work,
						volunteering,
						profile,
					}}
				></CV>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
