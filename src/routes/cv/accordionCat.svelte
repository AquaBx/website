<script lang="ts">
    import type { Post } from "$lib/types";
    import { Accordion, type AccordionItem } from "melt/builders";
    let {items = $bindable()} : {items: Item[]} = $props()

    type Item = AccordionItem<{
        title: string;
        categories: Post[]
    }>;

    const accordion = new Accordion();
</script>

<div {...accordion.root}>
  {#each items as i}
    {@const item = accordion.getItem(i)}
    <h2 {...item.heading}>
      <button {...item.trigger}>
        {item.item.title}
      </button>
    </h2>

    <div {...item.content}>
        {#each i.categories as c}
            {@const uuid = crypto.randomUUID()}
            <div class="flex items-center gap-1">
                <input type="checkbox"
                    id={uuid}
                    bind:checked={c.shown}
                >
                <label>{c.name}</label>
            </div>
        {/each}
    </div>
  {/each}
</div>