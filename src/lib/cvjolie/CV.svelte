<script lang="ts">
	import CvBlock from "./CVBlock.svelte";
	import { m } from "$lib/paraglide/messages";
	import { Icon } from "@steeze-ui/svelte-icon";
	import {
		Github,
		Globe,
		Linkedin,
		Mail,
		Phone,
		House,
	} from "@steeze-ui/lucide-icons";

	let { data } = $props();
	let { contests, projects, studies, work, volunteering, profile } = data;

	// Adaptation du format d'entrée YAML/frontmatter pour studies et companies
	function formatDateRange(start, end) {
		if (start && end) {
			return `${formatDate(start)} – ${formatDate(end)}`;
		} else if (start && !end) {
			return `Depuis ${formatDate(start)}`;
		} else if (!start && end) {
			return `Jusqu'à ${formatDate(end)}`;
		} else {
			return "";
		}
	}

	function formatDate(dateStr) {
		if (!dateStr) return "";
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return dateStr;
		// Format mois/année
		return date.toLocaleDateString("fr-FR", {
			month: "2-digit",
			year: "numeric",
		});
	}

	function getCategories(projects: { [k: string]: string[] }[]) {
		let categories = projects.map((p) => p.categories);
		let categories2: { [k: string]: string[] } = {};
		for (let c of categories) {
			for (let k in c) {
				let old = categories2[k] || [];
				categories2[k] = Array.from(new Set([...old, ...c[k]]));
			}
		}
		return categories2;
	}

	let categories: { [k: string]: string[] } = getCategories(projects);

	let el = $state();
	// let html2pdf: Function = $state();

	// onMount(async () => {
	// 	const module = await import("html2pdf.js");
	// 	html2pdf = module.default;
	// });

	async function generateImage(src, r) {
		const img = new Image();
		img.src = src;

		await new Promise((resolve) => {
			img.onload = resolve;
			console.log(img.sizes);
		});

		const canvas = document.createElement("canvas");
		canvas.width = canvas.height = 200;
		const ctx = canvas.getContext("2d")!;

		let imgWidth = (canvas.width * img.width) / img.height;
		let imgHeight = canvas.height;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.beginPath();
		ctx.arc(
			canvas.width * r,
			canvas.width * r,
			canvas.width * r,
			0,
			Math.PI * 2,
		);
		ctx.clip();
		ctx.drawImage(
			img,
			canvas.width - imgWidth - 80,
			-40,
			imgWidth * 2,
			imgHeight * 2,
		);
		ctx.restore();

		return canvas.toDataURL("image/PNG");
	}
</script>

<!-- <button
	onclick={() =>
		html2pdf()
			.from(el)
			.toPdf()
			.output("blob")
			.then((data) => {
				console.log(data);
				let fileURL = URL.createObjectURL(data);
				window.open(fileURL);
			})}>download</button
> -->
<main
	class="m-auto relative w-full flex flex-row p-4 gap-4 bg-gradient-to-br text-base bg-white text-black"
	bind:this={el}
>
	<!-- Colonne latérale -->
	<aside
		class="cv-aside print:static flex flex-col items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 w-[8cm] mx-auto"
	>
		<div class="w-32 h-32 rounded-full overflow-hidden shadow-lg">
			<img
				class="object-cover w-full h-full"
				src={profile.avatar}
				alt="Avatar"
				style="transform: scale(2) translate(5%,15%)"
			/>
		</div>
		<div class="text-center">
			<h1
				class="text-4xl font-extrabold text-sky-900 tracking-tight leading-tight print:text-xl"
			>
				{profile.name}
			</h1>
		</div>

		<!-- Résumé -->
		<section class="w-full">
			<h2
				class="text-sm font-bold text-sky-800 mb-1 pl-2 border-l-4 border-sky-200 tracking-wide uppercase"
			>
				Résumé
			</h2>
			<p class="text-sky-700 leading-snug text-sm">
				{profile.summary}
			</p>
		</section>
		<hr class="w-full border-t border-gray-200" />

		<!-- Bloc Contact -->
		<section class="w-full">
			<h2
				class="text-sm font-bold text-sky-800 mb-1 pl-2 border-l-4 border-sky-200 tracking-wide uppercase"
			>
				Contact
			</h2>
			<ul class="cv-list text-sm space-y-1">
				<li class="flex items-center gap-2 text-sky-700">
					<span
						class="inline-flex items-center justify-center w-4 h-4"
					>
						<Icon src={House} class="size-4" />
					</span>
					<a
						href={profile.address.url}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:underline"
					>
						{profile.address.value}
					</a>
				</li>
				<li class="flex items-center gap-2 text-sky-700">
					<span
						class="inline-flex items-center justify-center w-4 h-4"
					>
						<Icon src={Globe} class="size-4" />
					</span>
					<a
						href={profile.website.url}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:underline"
					>
						{profile.website.value}
					</a>
				</li>
				<li class="flex items-center gap-2 text-sky-700">
					<span
						class="inline-flex items-center justify-center w-4 h-4"
					>
						<Icon src={Phone} class="size-4" />
					</span>
					<a href={profile.phone.url} class="hover:underline">
						{profile.phone.value}
					</a>
				</li>
				<li class="flex items-center gap-2 text-sky-700">
					<span
						class="inline-flex items-center justify-center w-4 h-4"
					>
						<Icon src={Mail} class="size-4" />
					</span>
					<a href={profile.email.url} class="hover:underline">
						{profile.email.value}
					</a>
				</li>
				<li class="flex items-center gap-2 text-sky-700">
					<span
						class="inline-flex items-center justify-center w-4 h-4"
					>
						<Icon src={Linkedin} class="size-4" />
					</span>
					<a
						href={profile.linkedin.url}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:underline"
					>
						{profile.linkedin.value}
					</a>
				</li>
				<li class="flex items-center gap-2 text-sky-700">
					<span
						class="inline-flex items-center justify-center w-4 h-4"
					>
						<Icon src={Github} class="size-4" />
					</span>
					<a
						href={profile.github.url}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:underline"
					>
						{profile.github.value}
					</a>
				</li>
			</ul>
		</section>
		<hr class="w-full border-t border-gray-200" />

		<!-- Bloc Langues -->
		<section class="w-full">
			<h2
				class="text-sm font-bold text-sky-800 mb-1 pl-2 border-l-4 border-sky-200 tracking-wide uppercase"
			>
				Langues
			</h2>
			<ul class="flex flex-col gap-1 w-full text-sm space-y-1">
				<li class="flex flex-col gap-0.5">
					<div class="flex justify-between">
						<span
							>🇫🇷 Français — <span class="text-sky-500"
								>Natif</span
							></span
						>
					</div>
				</li>
				<li class="flex flex-col gap-0.5">
					<div class="flex justify-between">
						<span
							>🇬🇧 Anglais —
							<span class="text-sky-500">C1</span>
						</span>
					</div>
				</li>
				<li class="flex flex-col gap-0.5">
					<div class="flex justify-between">
						<span
							>🇪🇸 Espagnol —
							<span class="text-sky-500">B1</span>
						</span>
					</div>
				</li>
				<li class="flex flex-col gap-0.5">
					<div class="flex justify-between">
						<span
							>🇵🇱 Polonais —
							<span class="text-sky-500">Notions</span>
						</span>
					</div>
				</li>
			</ul>
		</section>
		<hr class="w-full border-t border-gray-200" />

		<!-- Bloc Diplômes et certifications -->
		<section class="w-full">
			<h2
				class="text-sm font-bold text-sky-800 mb-1 pl-2 border-l-4 border-sky-200 tracking-wide uppercase"
			>
				Diplômes et certifications
			</h2>
			<ul class="flex flex-col gap-1 w-full text-sm space-y-1">
				<li class="flex flex-col gap-0.5">
					<div class="flex justify-between">
						<span
							>Toeic — <span class="text-sky-600">965/990</span>
						</span>
						<span class="text-sky-500">2024</span>
					</div>
				</li>
				<li class="flex flex-col gap-0.5">
					<div class="flex justify-between">
						<span
							>Baccalauréat — <span class="text-sky-600"
								>Mention Très Bien</span
							></span
						>
						<span class="text-sky-500">2021</span>
					</div>
				</li>
				<li>Sensibilisation aux ODD</li>
				<li>Permis B</li>
				<li>PSC1</li>
			</ul>
		</section>
		<hr class="w-full border-t border-gray-200" />
		<!-- Bloc Compétences (Skills) dynamique -->
		<section class="w-full">
			<h2
				class="text-sm font-bold text-sky-800 mb-1 pl-2 border-l-4 border-sky-200 tracking-wide uppercase"
			>
				Compétences
			</h2>
			<div class="flex flex-col gap-2 text-sm">
				{#each Object.keys(categories) as c}
					<div>
						<span class="font-semibold text-sky-700">{c} :</span>
						<span class="ml-1">
							{categories[c].join(", ")}
						</span>
					</div>
				{/each}

				<div>
					<span class="font-semibold text-sky-700"
						>Outils & Méthodologies :</span
					>
					<span class="ml-1"> Figma, SCRUM </span>
				</div>

				<div>
					<span class="font-semibold text-sky-700">Soft skills :</span
					>
					<span class="ml-1">
						Travail en équipe, communication, adaptabilité,
						créativité, gestion de temps, résolution de problèmes,
						autonomie, curiosité, esprit d’initiative
					</span>
				</div>
			</div>
		</section>
	</aside>

	<!-- Colonne principale -->
	<section class="flex-1 flex flex-col gap-2">
		{#if work.some((e) => e.shown)}
			<CvBlock title={m.work()} posts={work} />
		{/if}
		{#if volunteering.some((e) => e.shown)}
			<CvBlock title={m.volunteering()} posts={volunteering} />
		{/if}
		{#if projects.some((e) => e.shown)}
			<CvBlock title={m.projects()} posts={projects} />
		{/if}
		{#if studies.some((e) => e.shown)}
			<CvBlock title={m.studies()} posts={studies} />
		{/if}
		{#if contests.some((e) => e.shown)}
			<CvBlock title={m.contests()} posts={contests} />
		{/if}
	</section>
</main>
