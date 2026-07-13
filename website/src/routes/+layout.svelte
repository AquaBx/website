<script lang="ts">
	import { getLocale, setLocale } from "$lib/paraglide/runtime";
	import Navbar from "$lib/components/navbar.svelte";
	import Footer from "$lib/components/footer.svelte";
	let { children } = $props();
	let lang = getLocale();

	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let onchange = () => {
		if (lang == "fr") {
			setLocale("en");
		} else {
			setLocale("fr");
		}
	};

	import { onNavigate } from "$app/navigation";
	import { m } from "$lib/paraglide/messages";

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div style="display:none">
	{#each locales as locale (locale)}
		<a
			href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
		>{locale}</a>
	{/each}
</div>

<main
	class="relative min-h-dvh pb-24 print:p-0 print:pb-0 print:min-h-0 overflow-x-hidden"
>
	<!-- Background grid -->
	<div
		class="fixed inset-0 -z-1 opacity-40
		bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)]
         bg-size-[40px_40px]
         mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
         [-webkit-mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
         print:hidden"
	></div>

	<!-- {#if page.url.pathname !== "/" }
		<header class="w-full py-6 px-4 flex justify-center print:hidden">
			<a
				href="/"
				class="text-2xl font-black tracking-tighter hover:text-sky-600 transition-colors"
				>{m.title()}.</a
			>
		</header>
	{/if} -->

	<container
		class="m-auto w-full flex flex-col gap-12 py-8 px-4 max-w-6xl print:p-0 print:m-0 print:max-w-none print:gap-0 print:py-0"
	>
		{@render children()}
	</container>

	<div class="mt-auto print:hidden">
		<Footer></Footer>
	</div>
</main>

<div class="print:hidden">
	<Navbar></Navbar>
</div>

<label
	class="flex justify-between items-center cursor-pointer fixed top-4 right-4 p-1 h-10 w-20 bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm rounded-full transition-all hover:shadow-md z-50 print:hidden"
>
	<input
		type="checkbox"
		value=""
		class="sr-only peer hidden"
		checked={lang == "en"}
		{onchange}
	/>
	<span
		class="size-8 grid place-items-center transition-all text-sm z-10 {lang ===
		'fr'
			? 'opacity-100'
			: 'opacity-40'}">🇫🇷</span
	>
	<span
		class="size-8 grid place-items-center transition-all text-sm z-10 {lang ===
		'en'
			? 'opacity-100'
			: 'opacity-40'}">🇬🇧</span
	>
	<span
		class="size-8 grid place-items-center transition-all rounded-full bg-slate-100 absolute left-1 peer-checked:left-11"
	></span>
</label>
