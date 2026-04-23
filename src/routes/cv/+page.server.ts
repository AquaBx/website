import { getLocale } from '$lib/paraglide/runtime.js'
import { processPosts, processProfile } from '$lib/content'
import type { PostJSON, AvailableLanguageTag } from '$lib/types'

import timelineJSON from "$content/timeline.json"
import projectsJSON from "$content/projects.json"
import profileJSON from "$content/profile.json"

export async function load() {
	const lang = getLocale() as AvailableLanguageTag
	const projects = processPosts(projectsJSON, lang)
	const timeline = processPosts(timelineJSON, lang)
    const profile = processProfile(profileJSON, lang)

	const contests = timeline.filter(a => a.type === "contest")
	const studies = timeline.filter(a => a.type === "study")
	const work = timeline.filter(a => a.type === "work")
	const volunteering = timeline.filter(a => a.type === "volunteering")

	return { 
        contests, 
        studies, 
        work, 
        volunteering, 
        projects,
        profile
    }
}
