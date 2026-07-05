import { defineCollection, z } from 'astro:content';
import { CATEGORY_SLUGS } from '../lib/categories';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			categories: z.array(z.enum(CATEGORY_SLUGS)).min(1).max(2),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
