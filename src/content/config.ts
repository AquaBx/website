import { defineCollection, z } from 'astro:content';
const projects = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		repository: z.string().optional(),
		homepage: z.string().optional(),
		name: z.string(),
		tags: z.array(z.string()).optional(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	}),
});
const companies = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		repository: z.string().optional(),
		homepage: z.string().optional(),
		name: z.string(),
		tags: z.array(z.string()).optional(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	}),
});

const contests = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		name: z.string(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	}),
});

const schools = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		name: z.string(),
		location: z.string(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	}),
});

export const collections = { projects, companies, schools, contests };
