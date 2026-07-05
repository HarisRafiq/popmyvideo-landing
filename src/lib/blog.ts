import type { CollectionEntry } from 'astro:content';
import type { CategorySlug } from './categories';

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

export function postsInCategory(
	posts: CollectionEntry<'blog'>[],
	categorySlug: CategorySlug,
): CollectionEntry<'blog'>[] {
	return posts
		.filter(isPublished)
		.filter((p) => p.data.categories.includes(categorySlug))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function relatedPosts(
	post: CollectionEntry<'blog'>,
	allPosts: CollectionEntry<'blog'>[],
	limit = 2,
): CollectionEntry<'blog'>[] {
	const categories = new Set(post.data.categories);
	return allPosts
		.filter(isPublished)
		.filter((p) => p.id !== post.id)
		.filter((p) => p.data.categories.some((c) => categories.has(c)))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, limit);
}
