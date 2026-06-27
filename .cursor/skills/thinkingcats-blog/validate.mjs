#!/usr/bin/env node
/**
 * Quick lint for ThinkingCats blog posts.
 * Usage: node .cursor/skills/thinkingcats-blog/validate.mjs src/content/blog/my-post.md
 */

import { readFileSync } from 'node:fs';

const BANNED = [
	/\bin today'?s fast[- ]paced\b/i,
	/\bgame[- ]changer\b/i,
	/\brevolutioniz(e|ing)\b/i,
	/\bdive deep\b/i,
	/\bunlock\b/i,
	/\bleverage\b/i,
	/\bit'?s no secret\b/i,
	/\bthe bottom line\b/i,
	/\bat the end of the day\b/i,
	/\blandscape\b/i,
	/\bever[- ]evolving\b/i,
	/\bwaitlist\b/i,
	/\bearly access\b/i,
	/\b#early-access\b/i,
	/\bagentic video (studio|producer)\b/i,
	/\bcreator economy\b/i,
	/^---\s*$/m, // horizontal rules mid-article (frontmatter excluded below)
];

const REQUIRED_FRONTMATTER = ['title', 'description', 'pubDate', 'heroImage', 'tags'];

const file = process.argv[2];
if (!file) {
	console.error('Usage: node validate.mjs <path-to-post.md>');
	process.exit(1);
}

const raw = readFileSync(file, 'utf8');
const errors = [];
const warnings = [];

// Frontmatter
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
if (!fmMatch) {
	errors.push('Missing YAML frontmatter');
} else {
	const fm = fmMatch[1];
	for (const key of REQUIRED_FRONTMATTER) {
		if (!new RegExp(`^${key}:`, 'm').test(fm)) {
			errors.push(`Missing frontmatter field: ${key}`);
		}
	}
	if (/^draft:\s*true/m.test(fm)) {
		warnings.push('Post is still draft: true');
	}
	const titleMatch = fm.match(/^title:\s*"?(.+?)"?\s*$/m);
	if (titleMatch && titleMatch[1].length > 60) {
		warnings.push(`Title is ${titleMatch[1].length} chars (aim for ≤60 for SEO)`);
	}
	const descMatch = fm.match(/^description:\s*"?(.+?)"?\s*$/m);
	if (descMatch) {
		const len = descMatch[1].length;
		if (len < 120 || len > 165) {
			warnings.push(`Description is ${len} chars (aim for 140–160)`);
		}
	}
}

// Body (after frontmatter)
const body = raw.replace(/^---[\s\S]*?---\n?/, '');

// Word count
const words = body.split(/\s+/).filter(Boolean).length;
if (words < 700) warnings.push(`Only ${words} words (aim for 900–1,400)`);
if (words > 1800) warnings.push(`${words} words — consider trimming`);

// Banned phrases (skip --- check in frontmatter by only checking body)
for (const pattern of BANNED) {
	if (pattern.source === '^---\\s*$') {
		if (pattern.test(body)) errors.push('Contains horizontal rule (---) — remove it');
	} else if (pattern.test(body)) {
		errors.push(`Banned phrase matched: ${pattern}`);
	}
}

// Before/after for comparison posts
if (/\b(before|after|vs\.?|versus|compare|comparison)\b/i.test(body) && !body.includes('before-after')) {
	warnings.push('Post compares results but has no .before-after block');
}

if (errors.length) {
	console.error('ERRORS:');
	errors.forEach((e) => console.error(`  ✗ ${e}`));
}
if (warnings.length) {
	console.warn('WARNINGS:');
	warnings.forEach((w) => console.warn(`  ! ${w}`));
}

if (!errors.length && !warnings.length) {
	console.log('OK — post passes validation');
}

process.exit(errors.length ? 1 : 0);
