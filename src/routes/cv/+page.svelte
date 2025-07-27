<script lang="ts">
	import { generatePDF } from "./cv2";

	import * as Accordion from "$lib/components/ui/accordion/index.js";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import type { Post } from "$lib/types";

	let { data } = $props();
	let { contests, projects, studies, companies, associations } =
		data;

	type DataKey =
		| "contests"
		| "projects"
		| "studies"
		| "companies"
		| "associations";

	let datas: Record<DataKey, Post[]> = $state({
		contests,studies,companies,associations,
		projects,
	});

	let pdfUri: URL | undefined = $state(undefined);

	$effect(() => {
		const fetchPDF = async () => {
			pdfUri = await generatePDF(datas);
		};
		fetchPDF();
	});
</script>

<div class="flex w-full gap-2 text-white">
	<div class="flex-1">
		{#each Object.keys(datas) as k}
			<Accordion.Root type="single">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>{k}</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-col gap-1">
							{#each datas[k as DataKey] as c}
								{@const uuid = crypto.randomUUID()}
								<div class="flex items-center gap-1">
									<Checkbox
										id={uuid}
										bind:checked={c.shown}
										onCheckedChange={() => {
											datas = { ...datas };
										}}
									></Checkbox>
									<Label for={uuid}>{c.name}</Label>
								</div>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		{/each}
	</div>

	<div class="flex-3">
		<iframe
			title="pdf"
			src={pdfUri as any as string}
			class="h-[75dvh] w-full"
		></iframe>
	</div>
</div>
