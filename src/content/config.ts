import { defineCollection, z } from 'astro:content';
const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		repository: z.string().optional(),
		homepage: z.string().optional(),
		name: z.string(),
		tags: z.array(z.string()).optional(),
		startDate: z.coerce.date(),
	}),
});

export const collections = { blog };
