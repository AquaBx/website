<script lang="ts">
	import CvRow from "./CVRow.svelte";
	const { posts, title } = $props();
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
		{title}
	</h2>
	<div class="flex flex-col gap-6">
		{#each posts as post}
			{#if post.shown}
				<CvRow {post}></CvRow>
			{/if}
		{/each}
	</div>
</section>
