<script lang="ts">
	import { getLocale, setLocale } from "$lib/paraglide/runtime";
	import "../app.css";
	import Header from "$lib/components/header.svelte";
	import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";
	let { children, data } = $props();
	let lang = getLocale();

	let onchange = () => {
		if (lang == "fr") {
			setLocale("en");
		} else {
			setLocale("fr");
		}
	};

	import { onNavigate } from '$app/navigation';

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
	
<main class="relative min-h-dvh mb-16">

	<Header></Header>
	<container	class="m-auto w-full flex flex-col gap-12 py-16 px-4 max-w-6xl print:p-0">
		{@render children()}
	</container>

	<Footer></Footer>

</main>

<Navbar></Navbar>
	<label
		class=" flex justify-between cursor-pointer absolute top-2 right-2 p-1 h-10 w-18 bg-white/40 rounded-full transition-all"
	>
		<input
			type="checkbox"
			value=""
			class="sr-only peer hidden"
			checked={lang == "en"}
			{onchange}
		/>
		<span
			class="size-8 grid place-items-center transition-all text-sm z-10 opacity-100 peer-checked:opacity-50"
			>🇫🇷</span
		>
		<span
			class="size-8 grid place-items-center transition-all text-sm z-10 opacity-50 peer-checked:opacity-100"
			>🇬🇧</span
		>
		<span
			class="size-8 grid place-items-center transition-all rounded-full bg-white/40 absolute peer-checked:translate-x-8"
		></span>
	</label>