<script lang="ts">
	const { date } = $props();
</script>

<time datetime={date.toISOString()}>
  {date.toLocaleDateString("fr-FR", { year: "numeric", month: "2-digit" })}
</time>