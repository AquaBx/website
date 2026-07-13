export type AvailableLanguageTag = 'en' | 'fr'

export type Categories = 'sveltekit' | 'svelte'

export type LocalizedString = Partial<Record<AvailableLanguageTag, string>>

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
	shown: boolean
	name: string
	categories?: { [key: string]: string[] }
	dates: { start?: Date, end?: Date }[]
	slug: string
	type: string
}

export type Profile = {
    name: string
    address: { value: string, url: string }
    website: { value: string, url: string }
    phone: { value: string, url: string }
    email: { value: string, url: string }
    linkedin: { value: string, url: string }
    github: { value: string, url: string }
    avatar: string
    summary: LocalizedString
    languages: { name: string, level: LocalizedString }[]
    certifications: { name: string, detail?: LocalizedString, year?: string }[]
}

export interface GalleryImage {
    src: any
    alt: string
}

export interface PostOut {
    images: GalleryImage[]
    title: string
    sources: string[]
}

export interface PostIn {
    sources: string[]
    title: string
}
