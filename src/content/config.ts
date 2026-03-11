import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.string(),
		category: z.string(),
		author: z.string(),
		tags: z.array(z.string()),
		readTime: z.string(),
		image: z.string(),
		summary: z.string(),
		featured: z.boolean().optional(),
	}),
});

export const collections = { blog };
