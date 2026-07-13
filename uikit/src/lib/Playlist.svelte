<script lang="ts">
    import { type Snippet } from "svelte";
    import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
    import { mod } from "./utils.ts";

    let index = $state(0);

    interface musictype {
        src: string;
        caption?: string;
        cover?: string;
    }

    interface controlstype {
        play: onclickT;
        pause: onclickT;
        next: onclickT;
        previous: onclickT;
        paused: boolean;
        duration: number;
        currentTime: number;
    }

    type onclickT = MouseEventHandler<HTMLButtonElement>;

    interface Props extends HTMLAttributes<HTMLDivElement> {
        music: Snippet<[musictype]>;
        controls: Snippet<[controlstype]>;
        musics: musictype[];
    }

    let { music, musics, controls, ...props }: Props = $props();

    let paused = $state(true);
    let currentTime = $state(0);
    let duration = $state(0);
    let playingMusic = $derived(musics.at(index));

    function play() {
        paused = false;
    }

    function pause() {
        paused = true;
    }

    function previous() {
        currentTime = 0;
        index = mod(index - 1, musics.length);
    }

    function next() {
        currentTime = 0;
        index = mod(index + 1, musics.length);
    }

    function onended() {
        next()
        paused = false
    }
</script>

<div {...props}>
    {#each musics as musicI, i}
        {#if i === index}
            <audio
                bind:currentTime
                bind:duration
                bind:paused
                src={musicI.src}
                onended={onended}
            ></audio>
        {/if}
    {/each}

    {@render music(playingMusic)}
    {@render controls({ previous, next, play, pause, paused, currentTime, duration })}
</div>
