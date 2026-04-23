<script lang="ts">
	import CvBlock from "./CVBlock.svelte";
	import { Icon } from "@steeze-ui/svelte-icon";
	import {
		Github,
		Globe,
		Linkedin,
		Mail,
		Phone,
		MapPin,
	} from "@steeze-ui/lucide-icons";

	let { data } = $props();
	let { profile } = $derived(data);

	function getCategories(allCategories: any[]) {
		let categories2: { [k: string]: string[] } = {};
		for (let cat of allCategories) {
			for (let p of cat.categories) {
				if (!p.shown || !p.categories) continue;
				for (let k in p.categories) {
					let old = categories2[k] || [];
					categories2[k] = Array.from(new Set([...old, ...p.categories[k]]));
				}
			}
		}
		return categories2;
	}

	let techCategories = $derived(getCategories(data.categories));
	let el = $state();
</script>

<main
	class="m-auto shadow-2xl border border-gray-100 relative w-full flex flex-row p-0 min-h-[29.7cm] bg-white text-slate-800 rounded-xl overflow-hidden print:shadow-none print:border-none print:rounded-none"
	bind:this={el}
>
	<!-- Barre latérale colorée (Sidebar) -->
	<aside
		class="w-[7.5cm] bg-slate-900 text-white p-8 flex flex-col gap-8 print:w-[6.5cm]"
	>
		<div class="flex flex-col items-center gap-4">
			<div class="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 shadow-inner bg-slate-800">
				<img
					class="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
					src={profile.avatar}
					alt="Avatar"
					style="transform: scale(1.8) translate(5%, 10%)"
				/>
			</div>
			<div class="text-center">
				<h1 class="text-2xl font-bold tracking-tight text-white uppercase">
					{profile.name}
				</h1>
				<div class="h-1 w-12 bg-sky-500 mx-auto mt-2 rounded-full"></div>
			</div>
		</div>

		<!-- Contact -->
		<section class="flex flex-col gap-4">
			<h2 class="text-xs font-black uppercase tracking-widest text-sky-400">Contact</h2>
			<ul class="flex flex-col gap-3 text-sm opacity-90">
				<li class="flex items-start gap-3">
					<Icon src={MapPin} class="size-4 mt-0.5 text-sky-400 shrink-0" />
					<a href={profile.address.url} target="_blank" class="hover:text-sky-300 transition-colors leading-snug">
						{profile.address.value}
					</a>
				</li>
				<li class="flex items-center gap-3">
					<Icon src={Mail} class="size-4 text-sky-400 shrink-0" />
					<a href={profile.email.url} class="hover:text-sky-300 transition-colors">
						{profile.email.value}
					</a>
				</li>
				<li class="flex items-center gap-3">
					<Icon src={Phone} class="size-4 text-sky-400 shrink-0" />
					<a href={profile.phone.url} class="hover:text-sky-300 transition-colors">
						{profile.phone.value}
					</a>
				</li>
				<li class="flex items-center gap-3">
					<Icon src={Globe} class="size-4 text-sky-400 shrink-0" />
					<a href={profile.website.url} target="_blank" class="hover:text-sky-300 transition-colors">
						{profile.website.value.replace("https://", "")}
					</a>
				</li>
				<li class="flex items-center gap-3">
					<Icon src={Linkedin} class="size-4 text-sky-400 shrink-0" />
					<a href={profile.linkedin.url} target="_blank" class="hover:text-sky-300 transition-colors">
						LinkedIn
					</a>
				</li>
				<li class="flex items-center gap-3">
					<Icon src={Github} class="size-4 text-sky-400 shrink-0" />
					<a href={profile.github.url} target="_blank" class="hover:text-sky-300 transition-colors">
						GitHub
					</a>
				</li>
			</ul>
		</section>

		<!-- Langues -->
		<section class="flex flex-col gap-4">
			<h2 class="text-xs font-black uppercase tracking-widest text-sky-400">Langues</h2>
			<ul class="flex flex-col gap-2 text-sm">
				{#each profile.languages as lang}
					<li class="flex justify-between items-center group">
						<span class="opacity-90">{lang.name}</span>
						<span class="text-[10px] font-bold px-2 py-0.5 bg-slate-800 rounded-full text-sky-400 uppercase tracking-tighter">
							{lang.level}
						</span>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Certifications -->
		<section class="flex flex-col gap-4">
			<h2 class="text-xs font-black uppercase tracking-widest text-sky-400">Certifications</h2>
			<ul class="flex flex-col gap-3 text-[11px] leading-tight">
				{#each profile.certifications as cert}
					<li class="flex flex-col gap-1">
						<span class="font-bold opacity-100 text-white">{cert.name}</span>
						<div class="flex justify-between opacity-70">
							<span>{cert.detail || ""}</span>
							<span class="italic">{cert.year || ""}</span>
						</div>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Compétences (Sidebar) -->
		<section class="flex flex-col gap-4">
			<h2 class="text-xs font-black uppercase tracking-widest text-sky-400">Compétences</h2>
			<div class="flex flex-wrap gap-2 text-[10px]">
				{#each Object.keys(techCategories) as c}
					<div class="flex flex-col gap-1 w-full">
						<span class="text-sky-200 font-bold opacity-80 uppercase tracking-tighter">{c}</span>
						<div class="flex flex-wrap gap-1">
							{#each techCategories[c] as tech}
								<span class="bg-slate-800 px-2 py-0.5 rounded border border-slate-700 opacity-90">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>
	</aside>

	<!-- Corps principal -->
	<section class="flex-1 p-10 flex flex-col gap-10 bg-white">
		<!-- En-tête / Résumé -->
		<div class="flex flex-col gap-4">
			<h2 class="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Profil</h2>
			<p class="text-slate-600 leading-relaxed text-sm italic">
				"{profile.summary}"
			</p>
		</div>

		<!-- Expériences / Projets -->
		<div class="flex flex-col gap-10">
			{#each data.categories as {title, categories: posts}}
				{#if posts.some(p => p.shown)}
					<CvBlock {title} {posts} />
				{/if}
			{/each}
		</div>
	</section>
</main>

<style>
	@media print {
		:global(body) {
			background: white;
		}
		main {
			box-shadow: none;
			border: none;
			border-radius: 0;
			min-height: auto;
		}
	}
</style>
