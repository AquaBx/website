<script lang="ts">
      import * as m from "$lib/paraglide/messages.js";
	import { locales, localizeHref } from '$lib/paraglide/runtime';
</script>

<div class="flex gap-4 items-center justify-center fixed bottom-2 left-1/2 -translate-x-1/2 p-4 text-white bg-white/10 w-fit m-auto rounded-2xl backdrop-blur-xs z-10">
    <a href={localizeHref("/")} class="border-b-4 border-white/50">
      {m.home()}
    </a>
    <a href={localizeHref("/projects")} class="border-b-4 border-white/50">
            {m.projects()}

    </a>
    <a href={localizeHref("/gallery")} class="border-b-4 border-white/50">
            {m.gallery()}

    </a>
<a href={localizeHref("/music")} class="border-b-4 border-white/50">
            {m.music()}

    </a>
    <a href={localizeHref("/cv")} class="border-b-4 border-white/50">
            {m.cv()}

    </a>
</div>