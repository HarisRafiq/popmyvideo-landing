import type { CollectionEntry } from 'astro:content';

export function postSlug(id: string): string {
	return id.replace(/\.(md|mdx)$/, '');
}

export function isPublished(post: CollectionEntry<'blog'>): boolean {
	return !post.data.draft;
}

/** ~220 wpm for short-form how-to posts */
export function readingTimeMinutes(body: string): number {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}
