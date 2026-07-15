<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
    import { Spring } from "svelte/motion";
    import { mod } from "./utils.ts";

    let spring = new Spring(0, { precision: 0.001 });

    interface imgtype {
        src: string;
        alt: string;
        caption?: string;
    }

    type onclickT = MouseEventHandler<HTMLButtonElement>;

    interface Props extends HTMLAttributes<HTMLDivElement> {
        image: Snippet<[imgtype]>;
        previous: Snippet<[onclickT]>;
        next: Snippet<[onclickT]>;
        images: imgtype[];
        show:number,
        gap:number
    }

    let {
        image,
        images : imagesold,
        previous,
        next,
        show,
        gap,
        ...props
    }:Props= $props();

    let images = $derived([...Array(Math.ceil((show+3)/imagesold.length))].map(_=>imagesold).flat())
    const len = $derived(images.length);

    const handleNext = (e: MouseEvent) => {
        spring.target = spring.target + 1;
    };

    const handlePrev = (e: MouseEvent) => {
        spring.target = spring.target - 1;
    };

    function item_visible(diff: number, show: number) {
        diff = mod(diff, len);
        return diff < show  || (len - 1) < diff;
    }

    function item_pos(diff : number) {
        diff = mod(diff, len);
        return diff > len / 2 ? diff - len : diff;
    }

    function item_style(diff : number) {
        let size = (100 + gap) / show - gap
        let size2 = (100 + gap) / size * 100

        return `transform:translateX(${size2 * item_pos(diff)}%); width:${size}%; height: 100%; position: absolute;`;
    }

    let dragging = false;
    let i_start:number;
    let drag_start: number;
    let width: number = $state(0);

    function mousedown(e:PointerEvent) {
        dragging = true;
        drag_start = e.screenX;
        i_start = spring.current;
        spring.stiffness = 0.999;
    }

    function mousemove(e:PointerEvent) {
        if (!dragging) return;
        let drag_current = e.screenX;
        spring.target = i_start + (drag_start - drag_current) / (width / show);
    }

    function mouseup(e:PointerEvent) {
        if (!dragging) return;

        spring.target = Math.round(spring.current);
        spring.stiffness = 0.1;
        dragging = false;
    }

</script>


<div {...props} bind:clientWidth={width}>
    {@render previous(handlePrev)}

    <div style="width:100%;height:100%;position:relative;overflow:hidden;" onpointerdown={mousedown} >
        {#each images as img, i2}
        {#if item_visible(i2 - spring.current, show)}
        <div style={item_style( item_pos(i2 - spring.current) * (1 / show) )} >
            {@render image(img)}
        </div>
        {/if}
        {/each}
    </div>

    {@render next(handleNext)}
</div>


<svelte:window
    onpointermove={mousemove}
    onpointerup={mouseup}
/>
