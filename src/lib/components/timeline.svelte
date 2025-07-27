<script lang="ts">
    import Timelinerow from "./timelinerow.svelte";

    let {list}  = $props()

    list.sort((a,b)=>{})
</script>

<div class="mx-4 lg:mx-auto flex flex-col before:bg-white/10 before:absolute before:left-3.5 before:w-1  before:top-12 before:bottom-12 relative before:rounded-full">
    {#each list as element}
        <Timelinerow {element}></Timelinerow>
    {/each}
</div>

