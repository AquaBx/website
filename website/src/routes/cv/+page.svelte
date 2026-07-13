<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import Title from "$lib/components/Title.svelte";
	import Typst from "$lib/typst/Typst.svelte";
	import { Icon } from "@steeze-ui/svelte-icon";
	import {
		SlidersHorizontal,
		Eye,
		Code,
		Check,
		Copy
	} from "@steeze-ui/lucide-icons";
	import AccordionCat from "./accordionCat.svelte";

	// @ts-ignore
	import templateContent from "./template.typ?raw";
	// @ts-ignore
	import avatarUrl from "../../content/moi.png";
	import type { Post } from "$lib/types";

	let { data } = $props();
	const snapshot = $state.snapshot(data);

	const rawProjects = [
		...(snapshot.projects?.ownedProjects || []),
		...(snapshot.projects?.ownedProjectsOrganisation || []),
		...(snapshot.projects?.contributions || [])
	];

	// Initialize the categories with an ID, title, and the items loaded from the server
	let categories = $state([
		{
			id: "work",
			title: m.work(),
			categories: (snapshot.work || []).map((c: any) => ({ ...c, shown: true })),
			open: true
		},
		{
			id: "projects",
			title: m.projects(),
			categories: rawProjects.map((p: any) => ({
				...p,
				description: p.description 
					? (typeof p.description === 'string' ? p.description : p.description.fr || p.description.en || '') 
					: '',
				shown: true,
				type: 'project',
				slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
				dates: p.dates ? p.dates.map((d: any) => ({
					start: d.start ? new Date(d.start) : undefined,
					end: d.end ? new Date(d.end) : undefined
				})) : []
			})),
			open: true
		},
		{
			id: "studies",
			title: m.studies(),
			categories: (snapshot.studies || []).map((c: any) => ({ ...c, shown: true })),
			open: false
		},
		{
			id: "contests",
			title: m.contests(),
			categories: (snapshot.contests || []).map((c: any) => ({ ...c, shown: true })),
			open: false
		},
		{
			id: "volunteering",
			title: m.volunteering(),
			categories: (snapshot.volunteering || []).map((c: any) => ({ ...c, shown: true })),
			open: false
		},
	]);

	// Keep track of which tab is active on the preview panel
	let activeTab = $state<"preview" | "code">("preview");
	let copied = $state(false);

	let avatarScale = $state(1.8);
	let avatarX = $state(5);
	let avatarY = $state(22);

	let avatarBytes = $state<Uint8Array | null>(null);

	$effect(() => {
		if (avatarUrl) {
			fetch(avatarUrl)
				.then(res => res.arrayBuffer())
				.then(buf => {
					avatarBytes = new Uint8Array(buf);
				})
				.catch(err => {
					console.error("Failed to load avatar image:", err);
				});
		}
	});

	let binaryInputs = $derived.by(() => {
		const res: { [key: string]: Uint8Array } = {};
		if (avatarBytes) {
			res['/avatar.png'] = avatarBytes;
		}
		return res;
	});

	// Helper to format date for French locale
	function formatDate(dateStr: string | Date): string {
		const date = new Date(dateStr);
		return isNaN(date.getTime())
			? dateStr.toString()
			: date.toLocaleDateString("fr-FR", { month: "2-digit", year: "numeric" });
	}

	// Helper to format date ranges
	function formatDateRange(dates: { start?: Date, end?: Date }[]): string {
		if (!dates || dates.length === 0) return "";
		const d = dates[0];
		if (d.start && d.end) return `${formatDate(d.start)} – ${formatDate(d.end)}`;
		if (d.start) return `Depuis ${formatDate(d.start)}`;
		if (d.end) return `Jusqu'à ${formatDate(d.end)}`;
		return "";
	}

	// Generate the dynamic main.typ file
	let mainTypContent = $derived.by(() => {
		function toTypstValue(val: any): string {
			if (val === null || val === undefined) {
				return "none";
			}
			if (typeof val === "boolean") {
				return val ? "true" : "false";
			}
			if (typeof val === "number") {
				return String(val);
			}
			if (typeof val === "string") {
				return `"${val.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
			}
			if (Array.isArray(val)) {
				if (val.length === 0) return "()";
				return `(${val.map(toTypstValue).join(", ")},)`;
			}
			if (typeof val === "object") {
				const entries = Object.entries(val);
				if (entries.length === 0) return "(:)";
				return `(${entries.map(([k, v]) => `${toTypstValue(k)}: ${toTypstValue(v)}`).join(", ")})`;
			}
			return "none";
		}

		function formatDatesForTypst(dates: { start?: Date, end?: Date }[]) {
			if (!dates || dates.length === 0) return "none";
			const items = dates.map(d => {
				const startStr = d.start ? formatDate(d.start) : "";
				const endStr = d.end ? formatDate(d.end) : null;
				return `(start: ${toTypstValue(startStr)}, end: ${toTypstValue(endStr)})`;
			});
			return `(${items.join(", ")},)`;
		}

		const profile = data.profile;
		
		// Extract and merge skills dynamically from shown projects
		const activeProjects = categories.find(c => c.id === 'projects')?.categories.filter((p: any) => p.shown) || [];
		
		function mergeCategories(projectsList: any[]): { [k: string]: string[] } {
			return projectsList.reduce((acc, curr) => {
				for (const [key, values] of Object.entries(curr.categories || {})) {
					acc[key] = Array.from(new Set([...(acc[key] || []), ...(values as string[])]));
				}
				return acc;
			}, {} as { [k: string]: string[] });
		}
		
		const skills = mergeCategories(activeProjects);

		const profileDictEntries: string[] = [];
		profileDictEntries.push(`name: ${toTypstValue(profile.name)}`);
		profileDictEntries.push(`summary: ${toTypstValue(profile.summary)}`);
		
		if (profile.address?.value && profile.address?.url) {
			profileDictEntries.push(`address: (value: ${toTypstValue(profile.address.value)}, url: ${toTypstValue(profile.address.url)})`);
		}
		if (profile.email?.value && profile.email?.url) {
			profileDictEntries.push(`email: (value: ${toTypstValue(profile.email.value)}, url: ${toTypstValue(profile.email.url)})`);
		}
		if (profile.phone?.value && profile.phone?.url) {
			profileDictEntries.push(`phone: (value: ${toTypstValue(profile.phone.value)}, url: ${toTypstValue(profile.phone.url)})`);
		}
		if (profile.website?.value && profile.website?.url) {
			profileDictEntries.push(`website: (value: ${toTypstValue(profile.website.value)}, url: ${toTypstValue(profile.website.url)})`);
		}
		if (profile.github?.value && profile.github?.url) {
			profileDictEntries.push(`github: (value: ${toTypstValue(profile.github.value)}, url: ${toTypstValue(profile.github.url)})`);
		}
		if (profile.linkedin?.value && profile.linkedin?.url) {
			profileDictEntries.push(`linkedin: (value: ${toTypstValue(profile.linkedin.value)}, url: ${toTypstValue(profile.linkedin.url)})`);
		}
		if (avatarBytes) {
			profileDictEntries.push(`avatar: "/avatar.png"`);
		} else {
			profileDictEntries.push(`avatar: none`);
		}
		profileDictEntries.push(`avatar_scale: ${avatarScale}`);
		profileDictEntries.push(`avatar_x: ${avatarX}`);
		profileDictEntries.push(`avatar_y: ${avatarY}`);
		if (profile.languages && profile.languages.length > 0) {
			profileDictEntries.push(`languages: ${toTypstValue(profile.languages)}`);
		}
		if (profile.certifications && profile.certifications.length > 0) {
			profileDictEntries.push(`certifications: ${toTypstValue(profile.certifications)}`);
		}
		if (Object.keys(skills).length > 0) {
			profileDictEntries.push(`skills: ${toTypstValue(skills)}`);
		}
		
		const profileTypst = `(${profileDictEntries.join(",\n    ")})`;

		const rightContentItems = categories.map(cat => {
			const activeItems = cat.categories.filter((el: any) => el.shown);
			if (activeItems.length === 0) return "";
			
			const typstItems = activeItems.map((el: any) => {
				const datesTypst = formatDatesForTypst(el.dates);
				const categoriesTypst = el.categories ? toTypstValue(el.categories) : "none";
				
				return `(
          name: ${toTypstValue(el.name)},
          dates: ${datesTypst},
          shown: true,
          description: ${toTypstValue(el.description)},
          location: ${toTypstValue(el.location)},
          categories: ${categoriesTypst}
        )`;
			}).join(",\n        ");
			
			return `#section_item(${toTypstValue(cat.title)}, (${typstItems},))`;
		}).filter(Boolean).join("\n\n  ");

		return `
#import "template.typ": cv_template, section_item

#show heading.where(level: 2): it => [
  #set text(size: 14pt, weight: "bold")
  #v(8pt)
  #it.body
  #v(4pt)
]

#cv_template(
  profile: ${profileTypst},
  left_content: [],
  right_content: [
    ${rightContentItems.trim()}
  ]
)
`.trim();
	});

	// Compute inputs for the Typst component
	let inputs = $derived({
		"/template.typ": templateContent,
		"/main.typ": mainTypContent
	});

	function copyToClipboard() {
		navigator.clipboard.writeText(mainTypContent);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="flex flex-col gap-12 py-12 print:p-0">
	<Title title={m.cv()} />
	<div
		class="flex w-full lg:flex-row flex-col-reverse gap-6 p-6 bg-gray-50 min-h-screen text-black print:p-0 print:bg-white"
	>
		<!-- Left Panel: Toggle Toggles & Categories -->
		<div class="lg:w-1/3 w-full print:hidden flex flex-col gap-6">
			<!-- Photo Adjustment Card -->
			<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
				<h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
					<Icon src={SlidersHorizontal} class="w-5 h-5 text-indigo-500 shrink-0" />
					Ajustement de la Photo
				</h2>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1.5">
						<div class="flex justify-between text-xs font-semibold text-slate-600">
							<span>Échelle</span>
							<span class="text-indigo-600 font-mono">{avatarScale.toFixed(1)}x</span>
						</div>
						<input 
							type="range" 
							min="1" 
							max="3" 
							step="0.1" 
							bind:value={avatarScale}
							class="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
						/>
					</div>

					<div class="flex flex-col gap-1.5">
						<div class="flex justify-between text-xs font-semibold text-slate-600">
							<span>Décalage X</span>
							<span class="text-indigo-600 font-mono">{avatarX}%</span>
						</div>
						<input 
							type="range" 
							min="-100" 
							max="100" 
							step="1" 
							bind:value={avatarX}
							class="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
						/>
					</div>

					<div class="flex flex-col gap-1.5">
						<div class="flex justify-between text-xs font-semibold text-slate-600">
							<span>Décalage Y</span>
							<span class="text-indigo-600 font-mono">{avatarY}%</span>
						</div>
						<input 
							type="range" 
							min="-100" 
							max="100" 
							step="1" 
							bind:value={avatarY}
							class="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
						/>
					</div>
				</div>
			</div>

			<AccordionCat bind:items={categories}></AccordionCat>
		</div>

		<!-- Right Panel: Typst Preview or Code Tabs -->
		<div class="lg:w-2/3 w-full sticky top-6 self-start print:static print:w-full flex flex-col gap-4 h-[750px] lg:h-[850px]">
			<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col h-full overflow-hidden">
				
				<!-- Tabs Controls -->
				<div class="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
					<div class="flex gap-2 p-1 bg-slate-100 rounded-xl">
						<button 
							onclick={() => activeTab = "preview"}
							class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
							class:bg-white={activeTab === "preview"}
							class:text-indigo-600={activeTab === "preview"}
							class:shadow-sm={activeTab === "preview"}
							class:text-slate-600={activeTab !== "preview"}
							class:hover:text-slate-900={activeTab !== "preview"}
						>
							<Icon src={Eye} class="w-4 h-4" />
							Aperçu PDF
						</button>
						<button 
							onclick={() => activeTab = "code"}
							class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
							class:bg-white={activeTab === "code"}
							class:text-indigo-600={activeTab === "code"}
							class:shadow-sm={activeTab === "code"}
							class:text-slate-600={activeTab !== "code"}
							class:hover:text-slate-900={activeTab !== "code"}
						>
							<Icon src={Code} class="w-4 h-4" />
							Source Typst
						</button>
					</div>

					{#if activeTab === "code"}
						<button 
							onclick={copyToClipboard}
							class="px-3.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-700 transition-all text-xs font-semibold flex items-center gap-1.5"
						>
							{#if copied}
								<Icon src={Check} class="w-3.5 h-3.5 text-green-600" />
								Copié !
							{:else}
								<Icon src={Copy} class="w-3.5 h-3.5" />
								Copier le code
							{/if}
						</button>
					{/if}
				</div>

				<!-- Workspace Content -->
				<div class="flex-1 overflow-hidden relative">
					{#if activeTab === "preview"}
						<Typst {inputs} {binaryInputs} />
					{:else}
						<div class="w-full h-full rounded-xl bg-slate-900 text-slate-100 p-6 font-mono text-xs overflow-auto shadow-inner leading-relaxed select-text border border-slate-800">
							<pre class="whitespace-pre">{mainTypContent}</pre>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
