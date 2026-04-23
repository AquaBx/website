<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import {
		Linkedin,
		Github,
		Codepen,
		Figma,
		Discord,
	} from "@steeze-ui/simple-icons";
	import { Icon } from "@steeze-ui/svelte-icon";

	let networks = [
		{
			icon: Linkedin,
			href: "https://linkedin.com/in/tom-chauvel",
			color: "hover:text-[#0077B5]",
		},
		{
			icon: Github,
			href: "https://github.com/aquabx",
			color: "hover:text-[#181717]",
		},
		{
			icon: Codepen,
			href: "https://codepen.io/AquaBx/pens/public",
			color: "hover:text-[#000000]",
		},
		{
			icon: Figma,
			href: "https://www.figma.com/@aquabx",
			color: "hover:text-[#F24E1E]",
		},
		{
			icon: Discord,
			href: "https://discord.com/users/163696573686087680",
			color: "hover:text-[#5865F2]",
		},
	];

	const age = Math.floor(
		(Date.now() - new Date(2003, 5, 19).getTime()) / 31556952000,
	);
</script>

<section
	class="min-h-[80dvh] flex items-center justify-center text-slate-900 px-4 py-12"
>
	<div
		class="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-16"
	>
		<div class="relative group">
			<div
				class="absolute -inset-4 bg-sky-100 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500 opacity-50"
			></div>
			<enhanced:img
				src="../../content/moi.png"
				alt="Me"
				class="w-64 md:w-80 aspect-3/4 rounded-xl shadow-2xl object-cover relative z-10 transition-all duration-500 group-hover:-translate-y-2"
			/>
		</div>

		<div class="flex flex-col gap-6 flex-1 text-center md:text-left">
			<div class="flex flex-col gap-2">
				<h1
					class="text-5xl md:text-7xl font-black tracking-tighter text-slate-900"
				>
					{m.title()}<span class="text-sky-500">.</span>
				</h1>
				<!-- <h2 class="text-xl md:text-2xl font-medium text-slate-500 tracking-tight">
                    Fullstack Developer & Creative Mind
                </h2> -->
			</div>

			<p class="text-lg leading-relaxed text-slate-600 max-w-2xl">
				{m.description({ age })}
			</p>

			<div
				class="flex gap-6 justify-center md:justify-start items-center mt-4"
			>
				{#each networks as { href, icon, color }}
					<a
						target="_blank"
						class="size-6 transition-all duration-300 text-slate-400 {color} hover:scale-110"
						{href}
					>
						<Icon src={icon}></Icon>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
