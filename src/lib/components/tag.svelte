<script lang="ts">
	import { BadgeInfo } from "@steeze-ui/lucide-icons";
	import * as icons from "@steeze-ui/simple-icons";
	import { Icon } from "@steeze-ui/svelte-icon";

	let { icon = "React" } = $props();

	let mapping: { [key: string]: icons.IconSource } = {
		HTML: icons.Html5,
		React: icons.React,
		Svelte: icons.Svelte,
		SvelteKit: icons.Svelte,
		VueJS: icons.Vuedotjs,
		Tailwind: icons.Tailwindcss,
		CSS: icons.Css3,
		JavaScript: icons.Javascript,
		Docker: icons.Docker,
		TypeScript: icons.Typescript,
		ElectronJS: icons.Electron,
		Tauri: icons.Tauri,
		AWS: icons.Amazonwebservices,
		"AWS-Amplify": icons.Awsamplify,
		"AWS-Lambda": icons.Awslambda,
		"AWS-Cognito": icons.Amazoncognito,
		"AWS-S3": icons.Amazons3,
		"AWS-DynamoDB": icons.Amazondynamodb,
		Python: icons.Python,
		NextJS: icons.Nextdotjs,
		"C++": icons.Cplusplus,
		Angular: icons.Angular,
		TypeORM: icons.Typeorm,
		NestJS: icons.Nestjs,
		SQLite: icons.Sqlite,
		Pocketbase: icons.Pocketbase,
	};
</script>

<div
	class="inline-block rounded-xl bg-white/10 text-white py-0.5 px-2.5 text-sm shadow-sm mr-2"
>
	<div class="flex flex-row items-center gap-1">
		<Icon
			src={mapping[icon] === undefined ? BadgeInfo : mapping[icon]}
			class="h-4 aspect-square"
		></Icon>
		{icon}
	</div>
</div>
