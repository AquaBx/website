import { Content } from '$lib/index'

export async function load() {
	return Content.getProjects()
}