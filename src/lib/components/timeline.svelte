<script lang="ts">
	import { BriefcaseBusiness, GraduationCap, HandHeart, Swords } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
	import Card from "./card.svelte";

	let choices = {
		"volunteering" : {
			color:"bg-pink-400",
			icon:HandHeart
		},
		"work" : {
			color:"bg-yellow-400",
			icon:BriefcaseBusiness
		},
		"study" : {
			color:"bg-green-400",
			icon:GraduationCap
		},
		"contest" : {
			color:"bg-red-400",
			icon:Swords
		},
	}

    let {list}  = $props()
</script>

<div class="mx-4 lg:mx-auto flex flex-col before:bg-white/10 before:absolute before:left-3.5 before:w-1  before:top-12 before:bottom-12 relative before:rounded-full">
    {#each list as element}
        {@const choice = choices[element.type]}
        <div class="relative flex gap-4 flex-1">
            <div class="flex flex-col items-center justify-center">
                <Icon src={choice.icon} class="{choice.color} rounded-full size-8 p-1 border-2 border-white" />
            </div>
            <Card {element}></Card>
        </div>
    {/each}
</div>

