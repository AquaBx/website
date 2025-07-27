export const prerender = true

export async function load({url, params }) {
	return { url:url.pathname }
}