# @aquabx/uikit

This package provides the core logic of the components, but without any style.

## Carousel
```svelte
<script lang="ts">
    import Playlist from "@aquabx/uikit/Carousel.svelte";
    import { Pause, Play, SkipBack, SkipForward } from "@steeze-ui/phosphor-icons";
    import { Icon } from "@steeze-ui/svelte-icon";

    let musics = [
        {
            src: "/mymusic1.mp3",
            caption: "mymusic1",

        },
        {
            src: "/mymusic2.mp3",
            caption: "mymusic2",
        },

    ];
</script>

<Playlist class="w-1/2 p-4 relative rounded-xl  bg-red-100" {musics}>
    {#snippet music({ cover, caption })}
        <p class="text-center text-red-900 font-bold">{caption}</p>
    {/snippet}
    {#snippet controls({play,pause,previous,next, paused, currentTime, duration})}
        <div>
            <input class="w-full" type="range" value={currentTime} max={duration} disabled>
            <div class="flex gap-2 justify-center text-red-900">
                <button class="p-2 bg-red-200 rounded-full" onclick={previous}><Icon class="size-4" src={SkipBack}/></button>
                
                <button class="p-2 bg-red-200 rounded-full" onclick={paused ? play : pause}>
                    <Icon class="size-4" src={paused ? Play : Pause}/>
                </button>
                <button class="p-2 bg-red-200 rounded-full" onclick={next}><Icon class="size-4" src={SkipForward}/></button>
            </div>
        </div>
    {/snippet}
</Playlist>
```

## Playlist / AudioPlayer
```svelte
<script lang="ts">
    import Carousel from "@aquabx/uikit/Carousel.svelte";
    import { CaretLeft, CaretRight } from "@steeze-ui/phosphor-icons";
    import { Icon } from "@steeze-ui/svelte-icon";

    let images = [
        {
            src: "/myimage1.png",
            alt: "myimage1",
            caption: "myimage1",
        },
        {
            src: "/myimage2.png",
            alt: "myimage2",
            caption: "myimage2",
        },
        {
            src: "/myimage3.png",
            alt: "myimage3",
            caption: "myimage3",
        },        
        {
            src: "/myimage4.png",
            alt: "myimage4",
            caption: "myimage4",
        },
    ];
</script>

<Carousel class="w-1/2 h-1/2 relative rounded-xl overflow-hidden" show={1} gap={0} {images}>
    {#snippet previous(onclick)}
        <button class="z-10 rounded-full  p-2 bg-white absolute left-5 top-1/2 -translate-y-1/2" {onclick}><Icon class="size-4" src={CaretLeft}/></button>
    {/snippet}

    {#snippet next(onclick)}
        <button class="z-10 rounded-full  p-2 bg-white absolute right-5 top-1/2 -translate-y-1/2" {onclick}><Icon class="size-4" src={CaretRight}/></button>
    {/snippet}

    {#snippet image({ alt, src })}
        <img draggable="false" class="w-full h-full object-cover select-none" {alt} {src}/>
    {/snippet}
</Carousel>
```