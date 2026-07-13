<script lang="ts">
        import { m } from "$lib/paraglide/messages.js";
        import { localizeHref } from "$lib/paraglide/runtime";
        import { page } from "$app/state";
        import { cn } from "$lib/utils";
        import { House, Briefcase, Image, Music, FileText } from "@steeze-ui/lucide-icons";
        import { Icon } from "@steeze-ui/svelte-icon";

        const links = [
            { href: "/", label: m.home, icon: House },
            { href: "/projects", label: m.projects, icon: Briefcase },
            { href: "/gallery", label: m.gallery, icon: Image },
            { href: "/music", label: m.music, icon: Music },
            { href: "/cv", label: m.cv, icon: FileText },
        ];
</script>

<nav class="fixed bottom-6 left-1/2 -translate-x-1/2 p-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl z-50 flex gap-1">
    {#each links as link}
        {@const active = page.url.pathname === localizeHref(link.href)}
        <a 
            href={localizeHref(link.href)} 
            class={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 group",
                active 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            )}
        >
            <Icon src={link.icon} class={cn("size-4 transition-transform group-hover:scale-110", active ? "text-sky-400" : "")} />
            <span class="text-sm font-bold tracking-tight">
                {link.label()}
            </span>
        </a>
    {/each}
</nav>
