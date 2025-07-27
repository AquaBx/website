export type Categories = 'sveltekit' | 'svelte'

export type LocalizedString = {
	[lang: string]: string
}

export type PostJSON = {
	repository?: string
	homepage?: string
	description?: LocalizedString
	location?: string
	name: LocalizedString
	categories?: { [key: string]: string[] }
	dates: { start?: string, end?: string }[]
	slug?: string
	type?: string
}

export type Post = {
	repository?: string
	homepage?: string
	description?: string
	location?: string
	shown:boolean
	name: string
	categories?: { [key: string]: string[] }
	dates: { start?: Date, end?: Date }[]
	slug: string
	type: string
}