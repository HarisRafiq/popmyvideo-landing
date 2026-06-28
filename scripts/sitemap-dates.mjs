import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Map blog post URLs to lastmod from frontmatter (used at build time). */
export function buildBlogLastmodMap(site) {
	const dir = join(process.cwd(), 'src/content/blog');
	const map = new Map();

	for (const file of readdirSync(dir).filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))) {
		const content = readFileSync(join(dir, file), 'utf8');
		const pubMatch = content.match(/^pubDate:\s*(.+)$/m);
		const updMatch = content.match(/^updatedDate:\s*(.+)$/m);
		const slug = file.replace(/\.(md|mdx)$/, '');
		const raw = (updMatch?.[1] ?? pubMatch?.[1])?.trim();
		if (!raw) continue;

		const lastmod = new Date(raw);
		if (Number.isNaN(lastmod.getTime())) continue;

		const path = `/blog/${slug}/`;
		map.set(path, lastmod);
		map.set(new URL(path, site).href, lastmod);
	}

	return map;
}
