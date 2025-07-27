export const prerender = true
export const ssr = true

export async function load({url, params }) {
	return { url:url.pathname }
}