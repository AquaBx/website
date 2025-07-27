<script lang="ts">
	import * as icons from "simple-icons";
	import { BadgeInfo } from "@lucide/svelte";

	let { icon = "React" } = $props();

	let mapping: { [key: string]: icons.SimpleIcon } = {
		HTML: icons.siHtml5,
		React: icons.siReact,
		Svelte: icons.siSvelte,
		SvelteKit: icons.siSvelte,
		VueJS: icons.siVuedotjs,
		Tailwind: icons.siTailwindcss,
		CSS: icons.siCss3,
		JavaScript: icons.siJavascript,
		Docker: icons.siDocker,
		TypeScript: icons.siTypescript,
		ElectronJS: icons.siElectron,
		Tauri: icons.siTauri,
		AWS: icons.siAmazonwebservices,
		"AWS-Amplify": icons.siAwsamplify,
		"AWS-Lambda": icons.siAwslambda,
		"AWS-Cognito": icons.siAmazoncognito,
		"AWS-S3": icons.siAmazons3,
		"AWS-DynamoDB": icons.siAmazondynamodb,
		Python: icons.siPython,
		NextJS: icons.siNextdotjs,
		"C++": icons.siCplusplus,
		Angular: icons.siAngular,
		TypeORM: icons.siTypeorm,
		NestJS: icons.siNestjs,
		SQLite: icons.siSqlite,
		Pocketbase: icons.siPocketbase,
	};

	let selection =
		icon in mapping ? mapping[icon] : { svg: "", hex: "222222" };
</script>

<div
	style="background:#{selection.hex}CC;"
	class="inline-block rounded-xl text-white py-0.5 px-2.5 text-sm shadow-sm mr-2"
>
	<div class="flex flex-row items-center gap-1">
		{#if icon in mapping}
			<div class="h-4 aspect-square fill-current">
				{@html selection.svg}
			</div>
		{:else}
			<BadgeInfo class="h-4 aspect-square"></BadgeInfo>
		{/if}
		{icon}
	</div>
</div>