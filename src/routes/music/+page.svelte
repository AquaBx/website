<script lang="ts">
	import Library from "$lib/library.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { SkipBack, Play, SkipForward } from "@steeze-ui/lucide-icons";
	import { onMount } from "svelte";

	let { data } = $props();
	let actualiseBarInterval;

	var audio: HTMLAudioElement;
	var isPlaying = false;
	let index = $state(0);
	var percent = $state(0);

	onMount(() => {
		audio = new Audio(data.library.at(index));
		audio.pause();
		audio.onended = next;
		audio.onplaying = () => {
			isPlaying = true;
			actualiseBarInterval = setInterval(actualiseBar, 1000);
		};

		audio.onpause = () => {
			isPlaying = false;
		};
	});

	$effect(() => {
		if (isPlaying) {
			audio.src = data.library.at(index);
			audio.play();
		}
	});

	function playPause() {
		if (audio.paused) audio.play();
		else audio.pause();
	}

	function previous() {
		audio.pause();
		index = index == 0 ? data.library.length - 1 : index - 1;
	}

	function next() {
		audio.pause();
		index = (index + 1) % data.library.length;
	}

	function actualiseBar() {
		percent = audio.currentTime / audio.duration;
		if (!isPlaying) clearInterval(actualiseBarInterval);
	}
</script>

<h1 class="text-5xl font-semibold text-white text-center">{m.music()}</h1>
<div class="text-white">
	<Library lib={data.library} bind:index></Library>
	<div class="">
		<div class="bg-white h-2" style="width:{percent * 100}%;"></div>
	</div>
	<div class="flex justify-center gap-2">
		<button class=" p-2" onclick={previous}>
			<Icon src={SkipBack}></Icon>
		</button>
		<button class=" p-2" onclick={playPause}>
			<Icon src={Play}></Icon>
		</button>
		<button class=" p-2" onclick={next}>
			<Icon src={SkipForward}></Icon>
		</button>
	</div>
</div>
