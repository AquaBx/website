<script lang="ts">
	import {
		BriefcaseBusiness,
		GraduationCap,
		HandHeart,
		Swords,
	} from "@steeze-ui/lucide-icons";
	import Card from "./card.svelte";
	import { Icon } from "@steeze-ui/svelte-icon";
	let { element } = $props();
</script>

<div class="relative flex gap-4 flex-1">
	<div class="flex flex-col items-center justify-center">
		{#if element.type == "volunteering"}
			<Icon
				src={HandHeart}
				class="bg-pink-400 rounded-full size-8 p-1 border-2 border-white"
			/>
		{:else if element.type == "work"}
			<Icon
				src={BriefcaseBusiness}
				class="bg-yellow-400 rounded-full size-8 p-1 border-2 border-white"
			/>
		{:else if element.type == "study"}
			<Icon
				src={GraduationCap}
				class="bg-green-400 rounded-full size-8 p-1 border-2 border-white"
			/>
		{:else if element.type == "contest"}
			<Icon
				src={Swords}
				class="bg-red-400 rounded-full size-8 p-1 border-2 border-white"
			/>
		{/if}
	</div>
	<Card {element}></Card>
</div>

<style>
</style>
