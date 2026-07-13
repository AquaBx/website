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

<div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-tight shadow-sm hover:border-sky-200 hover:bg-sky-50 transition-colors">
	<Icon src={mapping[icon] ? mapping[icon] : BadgeInfo} class="size-3 text-slate-400"></Icon>
	<span class="truncate max-w-[120px]">{icon}</span>
</div>
