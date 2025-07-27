<script lang="ts">

	import * as Accordion from "$lib/components/ui/accordion/index.js";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import type { Post } from "$lib/types";
    let {data = $bindable(), title} = $props()
</script>

<Accordion.Root type="single">
    <Accordion.Item value="item-1">
        <Accordion.Trigger>{title}</Accordion.Trigger>
        <Accordion.Content>
            <div class="flex flex-col gap-1">
                {#each data as c}
                    {@const uuid = crypto.randomUUID()}
                    <div class="flex items-center gap-1">
                        <Checkbox
                            id={uuid}
                            bind:checked={c.shown}
                        ></Checkbox>
                        <Label for={uuid}>{c.name}</Label>
                    </div>
                {/each}
            </div>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>