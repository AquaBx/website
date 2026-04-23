<script lang="ts">
	let { title } = $props();
</script>

<div class="flex flex-col items-center gap-2 text-center mb-8 print:hidden">
	<h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
		{title}
	</h1>
	<div class="h-1 w-12 bg-slate-900 rounded-full mt-2"></div>
</div>
