<script lang="ts">
	import { Playlist } from "@aquabx/uikit";
	import { m } from "$lib/paraglide/messages.js";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { SkipBack, Play, SkipForward, Pause, Music } from "@steeze-ui/lucide-icons";
    import Title from "$lib/components/Title.svelte";

	let { data } = $props();

    function formatTime(seconds: number) {
        if (isNaN(seconds) || seconds === Infinity) return "00:00";
        const date = new Date(0);
        date.setSeconds(seconds);
        return date.toISOString().substring(14, 19);
    }
</script>

<div class="flex flex-col gap-12 py-12">
    <Title title={m.music()}/>

    <Playlist class="max-w-xl w-full p-8 m-auto relative rounded-3xl bg-white border border-slate-100 shadow-xl" musics={data.library}>
        {#snippet music({ cover, caption })}
            <div class="flex flex-col items-center gap-6 mb-8">
                <div class="size-48 bg-slate-100 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden relative group">
                    <Icon src={Music} class="size-20 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                    {#if cover}
                        <img src={cover} alt={caption} class="absolute inset-0 w-full h-full object-cover" />
                    {/if}
                </div>
                <div class="text-center flex flex-col gap-1">
                    <p class="text-xl text-slate-900 font-bold tracking-tight">{caption}</p>
                    <p class="text-sm text-slate-400 font-medium">Original Track</p>
                </div>
            </div>
        {/snippet}

        {#snippet controls({play,pause,previous,next, paused, currentTime, duration})}
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-2">
                    <input 
                        class="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-500" 
                        type="range" 
                        value={currentTime} 
                        max={duration || 0} 
                        disabled
                    >
                    <div class="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div class="flex gap-8 justify-center items-center">
                    <button class="p-3 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-all active:scale-95" onclick={previous}>
                        <Icon class="size-6" src={SkipBack}/>
                    </button>
                    
                    <button class="size-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sky-500 transition-all hover:scale-105 active:scale-95" onclick={paused ? play : pause}>
                        <Icon class="size-8 {paused ? 'ml-1' : ''}" src={paused ? Play : Pause}/>
                    </button>

                    <button class="p-3 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-all active:scale-95" onclick={next}>
                        <Icon class="size-6" src={SkipForward}/>
                    </button>
                </div>
            </div>
        {/snippet}
    </Playlist>
</div>
