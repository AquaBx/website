import { Content } from "$lib/index";

export async function load() {

    return {
        contests: Content.getContests(),
        studies: Content.getStudies(),
        work: Content.getWork(),
        volunteering: Content.getVolunteering(),
        projects: Content.getProjects(),
        profile: Content.getProfile()
    }
}
