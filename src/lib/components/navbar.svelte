<script lang="ts">
      import * as m from "$lib/paraglide/messages.js";
</script>

<div class="flex gap-4 items-center justify-center fixed bottom-2 left-1/2 -translate-x-1/2 p-4 text-white bg-white/10 w-fit m-auto rounded-2xl backdrop-blur-xs z-10">
    <a href="/" class="border-b-4 border-white/50">
      {m.home()}
    </a>
    <a href="/projects" class="border-b-4 border-white/50">
            {m.projects()}

    </a>
    <a href="/gallery" class="border-b-4 border-white/50">
            {m.gallery()}

    </a>
    <a href="/cv" class="border-b-4 border-white/50">
            {m.cv()}

    </a>
</div>