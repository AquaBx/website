<script lang="ts">
  const today = new Date();

  import * as m from "$lib/paraglide/messages.js";

  import { siLinkedin, siGithub, siCodepen, siFigma } from "simple-icons";

  let networks = [
    {
      icon: siLinkedin.svg,
      href: "https://linkedin.com/in/tom-chauvel",
    },
    {
      icon: siGithub.svg,
      href: "https://github.com/aquabx",
    },
    {
      icon: siCodepen.svg,
      href: "https://codepen.io/AquaBx/pens/public",
    },
    {
      icon: siFigma.svg,
      href: "https://www.figma.com/@aquabx",
    },
  ];
</script>

<section
  class="h-dvh flex items-center relative justify-center text-white px-4"
>
  <div
    class="max-w-4xl w-full text-center flex items-center md:flex-row flex-col md:gap-8 gap-2 "
  >
    <img
      src="/moi.png"
      alt="Me"
      class="w-80 md:aspect-3/4 aspect-square rounded-xl shadow-lg object-cover"
    />

    <div class="flex flex-col gap-2 ">
      <h1 class="text-4xl md:text-5xl  font-bold">Tom Chauvel</h1>

      <p class="text-md md:text-xl max-w-2xl text-justify">
        {m.description({
          age: Math.floor(
            (Date.now() - new Date(2003, 5, 19).getTime()) / 31556952000,
          ),
        })}

      </p>

      <div class="flex gap-4 justify-center">
        {#each networks as n}
          <a
            target="blank"
            class="h-8 *:fill-white aspect-square"
            href={n.href}
          >
            {@html n.icon}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
