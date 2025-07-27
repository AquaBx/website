<script lang="ts">
    import HandHeart from "lucide-svelte/icons/hand-heart";
    import BriefcaseBusiness from "lucide-svelte/icons/briefcase-business";
    import GraduationCap from "lucide-svelte/icons/graduation-cap";
    import Swords from "lucide-svelte/icons/swords";
    import Card from "./card.svelte";
    let { element } = $props();


</script>

    <div
        class="relative flex gap-4 flex-1"
    >
        <div class="flex flex-col items-center justify-center">
            {#if element.type == "volunteering"}
                <HandHeart
                    class="bg-pink-400 rounded-full size-8 p-1 border-2 border-white"
                    color="white"
                ></HandHeart>
            {:else if element.type == "work"}
                <BriefcaseBusiness
                    class="bg-yellow-500 rounded-full size-8 p-1 border-2 border-white"
                    color="white"
                ></BriefcaseBusiness>
            {:else if element.type == "study"}
                <GraduationCap
                    class="bg-green-500 rounded-full size-8 p-1 border-2 border-white"
                    color="white"
                ></GraduationCap>
            {:else if element.type == "contest"}
                <Swords
                    class="bg-red-400 rounded-full size-8 p-1 border-2 border-white"
                    color="white"
                ></Swords>
            {/if}
        </div>
        <Card {element}></Card>
    </div>

<style>
</style>
