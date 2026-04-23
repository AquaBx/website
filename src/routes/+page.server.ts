import { getLocale } from '$lib/paraglide/runtime.js'
import { processPosts } from '$lib/content'
import type { AvailableLanguageTag } from '$lib/types'
import fusionJSON from "$content/timeline.json"

export async function load() {
	const lang = getLocale() as AvailableLanguageTag
	const timeline = processPosts(fusionJSON, lang)

	return { timeline }
}
