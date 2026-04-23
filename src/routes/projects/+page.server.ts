import { getLocale } from '$lib/paraglide/runtime.js'
import { processPosts } from '$lib/content'
import type { PostJSON } from '$lib/types'
import type { AvailableLanguageTag } from '$lib/types'
import projectsJSON from "$content/projects.json"

export async function load() {
	const lang = getLocale() as AvailableLanguageTag
	const projects = processPosts(projectsJSON, lang)

	return { projects }
}
