import { getLocale } from '$lib/paraglide/runtime.js'
import type { Post, PostJSON } from '$lib/types'

import timelineJSON from "$content/timeline.json"
import projectsJSON from "$content/projects.json"

function treat(lang: string, posts: PostJSON[]): Post[] {
	let postsN: Post[] = posts.map(p => {
		let p2: Post = {...p}
		p2.description = p.description ? (p.description[lang] ? p.description[lang] : "") : ""

		p2.name = p.name ? (p.name[lang] ? p.name[lang] : "") : ""

		for (let d of p2.dates) {
			d.start = d.start ? new Date(d.start) : undefined
			d.end = d.end ? new Date(d.end) : undefined
		}

		p2.shown = false

		return p2
	})

	return postsN.sort((first, second) => {
		let d1 = first.dates[0].end ? first.dates[0].end.getTime() : Date.now()
		let d2 = second.dates[0].end ? second.dates[0].end.getTime() : Date.now()
		return d2 - d1
	})
}

export async function load({ params }) {
	let lang = getLocale()
	const projects = treat(lang, projectsJSON)
	const timeline = treat(lang, timelineJSON)

	let contests = timeline.filter(a=>a.type=="contest")
	let studies = timeline.filter(a=>a.type=="study")
	let work = timeline.filter(a=>a.type=="work")
	let volunteering = timeline.filter(a=>a.type=="volunteering")

	return { contests,studies,work,volunteering,projects }
}