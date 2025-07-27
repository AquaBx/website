<script>
    import Timeline from "$lib/components/timeline.svelte";
    let { data } = $props();
    let { timeline } = data;
</script>

<Timeline list={timeline}></Timeline>
