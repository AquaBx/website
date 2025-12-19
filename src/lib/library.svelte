<script lang="ts">
	import { Play } from "@steeze-ui/lucide-icons";
	import { Icon } from "@steeze-ui/simple-icons";

	let { lib, index = $bindable() } = $props();
</script>

<table class="border-collapse table-auto w-full text-sm">
	<tbody>
		{#each lib as l, i}
			<tr
				onclick={() => (index = i)}
				class="cursor-pointer {i == index ? 'bg-white/10' : ''}"
			>
				<td class="border-b border-slate-200 p-4 pl-8">
					<Icon src={Play}></Icon>
				</td>
				<td class="border-b border-slate-200 p-4 pl-8">
					{l}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
