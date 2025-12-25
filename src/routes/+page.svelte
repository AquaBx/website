<script>
    import Timeline from "$lib/components/timeline.svelte";
    let { data } = $props();
</script>

<Timeline list={data.timeline}></Timeline>
