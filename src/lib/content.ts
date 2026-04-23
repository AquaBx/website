import type { Post, PostJSON, LocalizedString, AvailableLanguageTag } from "./types";

export function getLocalizedValue(localized: LocalizedString | undefined, lang: AvailableLanguageTag): string {
    if (!localized) return "";
    return localized[lang] || localized["en"] || Object.values(localized)[0] || "";
}

export function processPosts(posts: any[], lang: AvailableLanguageTag): Post[] {
    return posts.map(p => {
        const name = typeof p.name === 'string' ? { en: p.name } : p.name;
        const description = typeof p.description === 'string' ? { en: p.description } : p.description;
        
        return {
            ...p,
            name: getLocalizedValue(name, lang),
            description: getLocalizedValue(description, lang),
            shown: true,
            slug: p.slug || (name && name["en"] ? name["en"].toLowerCase().replace(/\s+/g, '-') : ""),
            type: p.type || "project",
            dates: (p.dates || []).map((d: any) => ({
                start: d.start ? new Date(d.start) : undefined,
                end: d.end ? new Date(d.end) : undefined
            }))
        } as Post;
    }).sort((a, b) => {
        const d1 = a.dates[0]?.end ? a.dates[0].end.getTime() : Date.now();
        const d2 = b.dates[0]?.end ? b.dates[0].end.getTime() : Date.now();
        return d2 - d1;
    });
}

export function processProfile(profile: any, lang: AvailableLanguageTag) {
    return {
        ...profile,
        summary: getLocalizedValue(profile.summary, lang),
        languages: (profile.languages || []).map((l: any) => ({
            ...l,
            level: getLocalizedValue(l.level, lang)
        })),
        certifications: (profile.certifications || []).map((c: any) => ({
            ...c,
            detail: getLocalizedValue(c.detail, lang)
        }))
    };
}
