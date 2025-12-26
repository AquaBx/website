<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import AccordionCat from "./accordionCat.svelte";
	let { data } = $props();

	let profile = {
	name: "Tom Chauvel",
		address: { value: "35740 Pacé, France", url: "https://maps.google.com/?q=35740+Pacé,+France" },
		website: { value: "www.aquabx.ovh", url: "https://www.aquabx.ovh/" },
		phone: { value: "+33601846944", url: "tel:+33601846944" },
		email: { value: "tom.chauvel@hotmail.com", url: "mailto:tom.chauvel@hotmail.com" },
		linkedin: { value: "linkedin.com/in/tom-chauvel", url: "https://www.linkedin.com/in/tom-chauvel" },
		github: { value: "github.com/aquabx", url: "https://github.com/aquabx" },
		avatar: "/moi.png",
		summary: "Étudiant curieux en 2ème année à l’ESIR, je recherche un stage de fin d’études ou un contrat de professionnalisation dans le développement web full-stack."
	};


	let dataInput = $state({
		profile:profile,
		categories:[
			{title:m.contests(), categories: data.contests},
			{title:m.projects(), categories: data.projects},
			{title:m.studies(), categories: data.studies},
			{title:m.work(), categories: data.work},
			{title:m.volunteering(), categories: data.volunteering},
		]
	})

    import CV from "$lib/cvjolie/CV.svelte";
	// import template from "./template.typ?raw";
    // import { main } from "./main";
    // import Typst from "$lib/typst/Typst.svelte";


	// const inputs = $derived({
	// 	"/main.typ":main(dataInput),
	// 	"/template.typ":template,
	// });
</script>

<div class="flex w-full md:flex-row flex-col-reverse gap-2 text-white">
	<AccordionCat bind:items={dataInput.categories}></AccordionCat>
	<!-- <Typst {inputs}></Typst> -->
	<CV data={dataInput}></CV>
</div>
