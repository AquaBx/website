<script lang="ts">
    import Timeline from "$lib/components/timeline.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import { m } from "$lib/paraglide/messages";
	import Title from "$lib/components/Title.svelte";
    let { data } = $props();
</script>

<Hero />

<section class="flex flex-col gap-12 py-16">
    <Title title={m.timeline()} />
    <Timeline list={data.timeline}></Timeline>
</section>
