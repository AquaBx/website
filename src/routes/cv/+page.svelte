<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { m } from "$lib/paraglide/messages";
    import { onMount } from "svelte";
    import AccordionCat from "./accordionCat.svelte";
	import { generatePDF } from "./cv2";

	let { data } = $props();

	let contests = $state(data.contests);
	let projects = $state(data.projects);
	let studies = $state(data.studies);
	let work = $state(data.work);
	let volunteering = $state(data.volunteering);

	let pdfUri: URL | undefined = $state()

	let onclick = async () => {
		pdfUri = await generatePDF(contests,studies,work,volunteering, projects) as URL
	}

	onMount(()=>{
		onclick()
	})

</script>

<div class="flex w-full md:flex-row flex-col-reverse gap-2 text-white">
	<div class="flex-1">
		<AccordionCat title={m.contests()} bind:data={contests}></AccordionCat>
		<AccordionCat title={m.studies()} bind:data={studies}></AccordionCat>
		<AccordionCat title={m.work()} bind:data={work}></AccordionCat>
		<AccordionCat title={m.volunteering()} bind:data={volunteering}></AccordionCat>
		<AccordionCat title={m.projects()} bind:data={projects}></AccordionCat>
		<Button {onclick}>Generate</Button>
	</div>

	<div class="flex-3">
		<iframe
			title="pdf"
			src={pdfUri as any as string}
			class="h-[75dvh] w-full"
		></iframe>
	</div>
</div>
