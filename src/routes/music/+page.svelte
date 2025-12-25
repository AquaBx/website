<script lang="ts">
	import { Playlist } from "@aquabx/uikit";
	import { m } from "$lib/paraglide/messages.js";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { SkipBack, Play, SkipForward, Pause } from "@steeze-ui/lucide-icons";

	let { data } = $props();
</script>

<h1 class="text-5xl font-semibold text-white text-center">{m.music()}</h1>

<Playlist class="w-1/2 p-4 m-auto relative rounded-xl  bg-white/10" musics={data.library}>
	{#snippet music({ cover, caption })}
		<p class="text-center text-white/90 font-bold">{caption}</p>
	{/snippet}
	{#snippet controls({play,pause,previous,next, paused, currentTime, duration})}
		<div>
			<input class="w-full" type="range" value={currentTime} max={duration} disabled>
			<div class="flex gap-2 justify-center text-white/90">
				<button class="p-2 bg-white/20 rounded-full" onclick={previous}><Icon class="size-4" src={SkipBack}/></button>
				
				<button class="p-2 bg-white/20 rounded-full" onclick={paused ? play : pause}>
					<Icon class="size-4" src={paused ? Play : Pause}/>
				</button>
				<button class="p-2 bg-white/20 rounded-full" onclick={next}><Icon class="size-4" src={SkipForward}/></button>
			</div>
		</div>
	{/snippet}
</Playlist>
