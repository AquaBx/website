import { getLocale } from '$lib/paraglide/runtime.js'
import { processPosts, processProfile } from '$lib/content'
import type { AvailableLanguageTag } from '$lib/types'

import timelineJSON from "$content/timeline.json"
import profileJSON from "$content/profile.json"
import { fetchProjects } from '@website/utils'
import { GITHUB_TOKEN } from '$env/static/private'

export class Content {
    static projects: Record<string, any> = {}

    static getProjects() {
        const lang = getLocale() as AvailableLanguageTag

        if (Content.projects[lang] === undefined) {
            fetchProjects(GITHUB_TOKEN, lang).then((res) => {
                Content.projects[lang] = res
            })
            return {
                ownedProjectsOrganisation: [],
                ownedProjects: [],
                contributions: []
            }
        }

        return Content.projects[lang]
    }
    static getProfile() {
        const lang = getLocale() as AvailableLanguageTag
        return processProfile(profileJSON, lang)
    }
    static getContests() {
        const lang = getLocale() as AvailableLanguageTag
        return processPosts(timelineJSON.filter(a => a.type === "contest"), lang)

    }
    static getStudies() {
        const lang = getLocale() as AvailableLanguageTag
        return processPosts(timelineJSON.filter(a => a.type === "study"), lang)

    }
    static getWork() {
        const lang = getLocale() as AvailableLanguageTag
        return processPosts(timelineJSON.filter(a => a.type === "work"), lang)

    }
    static getVolunteering() {
        const lang = getLocale() as AvailableLanguageTag
        return processPosts(timelineJSON.filter(a => a.type === "volunteering"), lang)

    }
}