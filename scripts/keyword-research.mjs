#!/usr/bin/env node
/**
 * Keyword opportunity scout for PopMyVideo.
 *
 * Uses Google Autocomplete (free, no Ads API) + optional SERP result-count
 * probes to rank seed → long-tail ideas by demand signal and competition proxy.
 *
 * Official Keyword Planner volumes need a Google Ads developer token + customer
 * ID. Pass --ads-csv=path.csv if you export from Keyword Planner UI.
 *
 * Usage:
 *   node scripts/keyword-research.mjs
 *   node scripts/keyword-research.mjs --ads-csv=exports/keyword-planner.csv
 *   node scripts/keyword-research.mjs --json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'research');

const SEEDS = [
	// Captions (store + web)
	'add captions to video',
	'auto captions',
	'auto captions for reels',
	'ai caption generator',
	'animated captions',
	'subtitle generator',
	'add subtitles to video on phone',
	'captions for tiktok',
	'captions for instagram reels',
	'burned in captions',
	// Effects / polish
	'video effects for reels',
	'reels effects app',
	'ai video effects',
	'motion graphics app',
	'text overlay video',
	'add text to video',
	'lower third app',
	// Sound (SFX — not music beds)
	'add sound effects to video',
	'sound effects for reels',
	'add sound to silent video',
	'ai sound effects video',
	'whoosh sound effect video',
	// Product / use cases
	'product video maker',
	'silent product video ad',
	'podcast clip captions',
	'talking head video editing',
	'capcut alternative captions',
	'submagic alternative',
	'auto effects for reels',
	'ai video editor for reels',
];

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

function parseArgs(argv) {
	const opts = { json: false, adsCsv: null, out: null };
	for (const a of argv.slice(2)) {
		if (a === '--json') opts.json = true;
		else if (a.startsWith('--ads-csv=')) opts.adsCsv = a.slice('--ads-csv='.length);
		else if (a.startsWith('--out=')) opts.out = a.slice('--out='.length);
	}
	return opts;
}

async function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

async function fetchSuggest(query) {
	const url =
		'https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=' +
		encodeURIComponent(query);
	const res = await fetch(url, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PopMyVideoKeywordBot/1.0)' },
	});
	if (!res.ok) throw new Error(`suggest ${res.status} for ${query}`);
	const data = await res.json();
	return Array.isArray(data?.[1]) ? data[1].map(String) : [];
}

async function expandSeed(seed) {
	const seen = new Set();
	const ideas = [];

	const push = (phrase, source) => {
		const k = phrase.toLowerCase().trim();
		if (!k || seen.has(k)) return;
		seen.add(k);
		ideas.push({ keyword: k, source, seed });
	};

	push(seed, 'seed');

	try {
		for (const s of await fetchSuggest(seed)) push(s, 'suggest');
	} catch {
		/* ignore */
	}
	await sleep(120);

	// Alphabet expansion for long-tail coverage
	for (const ch of ALPHABET) {
		try {
			for (const s of await fetchSuggest(`${seed} ${ch}`)) push(s, 'alpha');
		} catch {
			/* ignore */
		}
		await sleep(80);
	}

	return ideas;
}

const JUNK =
	/\b(mod apk|for girls|for boys|for couple|to go viral|hinglish|\bin urdu\b|\bin hindi\b|for photo|photo caption|status|quotes|webcam|remover|prompt|game whoosh)\b/i;

function isJunk(keyword) {
	const k = keyword.toLowerCase();
	if (JUNK.test(k)) return true;
	// Instagram/TikTok "captions" meaning photo/post text, not burned-in subtitles
	if (/^captions for (tiktok|instagram)/.test(k) && !/\b(video|reel|auto|subtitle)\b/.test(k))
		return true;
	return false;
}

function scoreIdea(idea) {
	const k = idea.keyword;
	if (isJunk(k)) {
		return { ...idea, words: k.split(/\s+/).length, demand: 0, competition: 10, opportunity: 0, fit: 'junk' };
	}
	const words = k.split(/\s+/).length;

	// Demand proxy: longer suggest chains + commercial modifiers
	let demand = 1;
	if (idea.source === 'suggest') demand += 2;
	if (idea.source === 'seed') demand += 3;
	if (/\b(app|iphone|android|free|ai|auto|reels|tiktok|shorts)\b/.test(k)) demand += 2;
	if (/\b(how to|add|make|generator|editor)\b/.test(k)) demand += 1;

	// Competition proxy (lower is better opportunity): head terms are harder
	let competition = 5;
	if (words >= 4) competition -= 2;
	if (words >= 5) competition -= 1;
	if (/\b(capcut|premiere|after effects|davinci)\b/.test(k)) competition += 1;
	if (/\b(best|top|free)\b/.test(k)) competition += 1;
	if (/\b(silent|sound effect|whoosh|timed|animated caption|podcast clip)\b/.test(k))
		competition -= 1;

	competition = Math.max(1, Math.min(10, competition));
	demand = Math.max(1, Math.min(10, demand));

	// Opportunity = demand / competition (higher better)
	const opportunity = Math.round((demand / competition) * 100) / 100;

	let fit = 'adjacent';
	if (/\b(caption|subtitle|overlay|text to video|lower third)\b/.test(k)) fit = 'core-captions';
	else if (/\b(sound effect|silent video|whoosh|sfx|mute video)\b/.test(k)) fit = 'core-sfx';
	else if (/\b(video effect|reels effect|motion graphic|auto effect)\b/.test(k)) fit = 'core-effects';
	else if (/\b(product video|podcast|talking head|b-?roll)\b/.test(k)) fit = 'use-case';
	else if (/\b(music|song|beat|spotify)\b/.test(k) && !/\bsound effect\b/.test(k))
		fit = 'avoid-music-bed';
	else if (/\b(ai video|text to video|generate video|from text)\b/.test(k)) fit = 'avoid-ai-gen';

	return { ...idea, words, demand, competition, opportunity, fit };
}

function parseAdsCsv(path) {
	const raw = readFileSync(path, 'utf8');
	const lines = raw.split(/\r?\n/).filter(Boolean);
	if (lines.length < 2) return [];

	const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim().toLowerCase());
	const idx = (names) => headers.findIndex((h) => names.some((n) => h.includes(n)));

	const iKw = idx(['keyword', 'search term']);
	const iVol = idx(['avg. monthly', 'average monthly', 'search volume', 'volume']);
	const iComp = idx(['competition (indexed', 'competition']);
	const iCompVal = idx(['competition (indexed value)', 'competition indexed']);

	if (iKw < 0) throw new Error('CSV missing Keyword column — export from Keyword Planner Ideas');

	const rows = [];
	for (const line of lines.slice(1)) {
		const cols = line.match(/("([^"]|"")*"|[^,]*)/g)?.map((c) => c.replace(/^"|"$/g, '').replace(/""/g, '"')) ?? [];
		const keyword = (cols[iKw] || '').toLowerCase().trim();
		if (!keyword) continue;
		const volumeRaw = iVol >= 0 ? cols[iVol] : '';
		const volume = Number(String(volumeRaw).replace(/[^0-9.]/g, '')) || 0;
		const competitionLabel = iComp >= 0 ? (cols[iComp] || '').toLowerCase() : '';
		const competitionIndexed =
			iCompVal >= 0 ? Number(String(cols[iCompVal]).replace(/[^0-9.]/g, '')) : null;

		rows.push({
			keyword,
			volume,
			competitionLabel,
			competitionIndexed,
			source: 'keyword-planner',
		});
	}
	return rows;
}

function mergeAds(ideas, adsRows) {
	const byKw = new Map(adsRows.map((r) => [r.keyword, r]));
	return ideas.map((idea) => {
		const ads = byKw.get(idea.keyword);
		if (!ads) return idea;
		const competition =
			ads.competitionIndexed != null
				? Math.round(ads.competitionIndexed * 10) || idea.competition
				: ads.competitionLabel === 'low'
					? 2
					: ads.competitionLabel === 'medium'
						? 5
						: ads.competitionLabel === 'high'
							? 8
							: idea.competition;
		const demand =
			ads.volume >= 10000 ? 10 : ads.volume >= 1000 ? 8 : ads.volume >= 100 ? 6 : ads.volume > 0 ? 4 : idea.demand;
		const opportunity = Math.round((demand / Math.max(1, competition)) * 100) / 100;
		return {
			...idea,
			volume: ads.volume,
			competitionLabel: ads.competitionLabel,
			competition,
			demand,
			opportunity,
			source: `${idea.source}+planner`,
		};
	});
}

function pickWinners(scored) {
	const keep = scored.filter(
		(r) =>
			r.fit !== 'junk' &&
			r.opportunity > 0 &&
			(r.fit.startsWith('core') ||
				r.fit === 'use-case' ||
				(r.fit === 'adjacent' && r.words >= 3)),
	);
	keep.sort((a, b) => b.opportunity - a.opportunity || (b.volume || 0) - (a.volume || 0));
	return keep;
}

function clusterByFit(rows) {
	const clusters = {};
	for (const r of rows) {
		(clusters[r.fit] ??= []).push(r);
	}
	return clusters;
}

async function main() {
	const opts = parseArgs(process.argv);
	console.error(`Expanding ${SEEDS.length} seeds via Google Suggest…`);

	const all = [];
	for (const seed of SEEDS) {
		console.error(`  → ${seed}`);
		const ideas = await expandSeed(seed);
		all.push(...ideas);
	}

	// Dedupe keeping best source priority
	const priority = { seed: 3, suggest: 2, alpha: 1 };
	const best = new Map();
	for (const idea of all) {
		const prev = best.get(idea.keyword);
		if (!prev || (priority[idea.source] || 0) > (priority[prev.source] || 0)) {
			best.set(idea.keyword, idea);
		}
	}

	let scored = [...best.values()].map(scoreIdea);

	if (opts.adsCsv) {
		console.error(`Merging Keyword Planner CSV: ${opts.adsCsv}`);
		const ads = parseAdsCsv(opts.adsCsv);
		scored = mergeAds(scored, ads);
		// Also add planner-only keywords not in suggest
		const have = new Set(scored.map((s) => s.keyword));
		for (const row of ads) {
			if (have.has(row.keyword)) continue;
			scored.push(
				scoreIdea({
					keyword: row.keyword,
					source: 'keyword-planner',
					seed: 'planner',
					volume: row.volume,
					competitionLabel: row.competitionLabel,
				}),
			);
		}
	}

	const winners = pickWinners(scored);
	const clusters = clusterByFit(winners);

	const report = {
		generatedAt: new Date().toISOString(),
		method: opts.adsCsv
			? 'Google Suggest + Keyword Planner CSV'
			: 'Google Suggest demand/competition proxies (no Ads API)',
		note: opts.adsCsv
			? null
			: 'Volumes are proxies until you export from Google Ads → Tools → Keyword Planner and pass --ads-csv=',
		totals: {
			rawIdeas: all.length,
			unique: scored.length,
			ranked: winners.length,
		},
		topOpportunities: winners.slice(0, 40),
		byFit: Object.fromEntries(
			Object.entries(clusters).map(([fit, rows]) => [fit, rows.slice(0, 15)]),
		),
		contentBriefs: buildBriefs(winners),
	};

	mkdirSync(OUT_DIR, { recursive: true });
	const outPath = opts.out || join(OUT_DIR, 'keyword-opportunities.json');
	writeFileSync(outPath, JSON.stringify(report, null, 2));

	const mdPath = join(OUT_DIR, 'keyword-opportunities.md');
	writeFileSync(mdPath, toMarkdown(report));

	if (opts.json) {
		console.log(JSON.stringify(report, null, 2));
	} else {
		console.log(toMarkdown(report));
		console.error(`\nWrote ${outPath}`);
		console.error(`Wrote ${mdPath}`);
	}
}

function buildBriefs(winners) {
	const briefs = [];
	const want = [
		{ fit: 'core-captions', titleHint: 'Add Auto Captions to Video on Your Phone' },
		{ fit: 'core-sfx', titleHint: 'Add Sound Effects to Silent Video' },
		{ fit: 'core-effects', titleHint: 'Video Effects for Reels Without After Effects' },
		{ fit: 'use-case', titleHint: 'Turn Silent Product Footage Into an Ad' },
	];
	for (const w of want) {
		const kws = winners.filter((r) => r.fit === w.fit).slice(0, 8);
		if (!kws.length) continue;
		briefs.push({
			suggestedTitle: w.titleHint,
			primaryKeyword: kws[0].keyword,
			supportingKeywords: kws.slice(1, 6).map((k) => k.keyword),
			categoryHint:
				w.fit === 'core-captions'
					? 'auto-captions'
					: w.fit === 'core-sfx'
						? 'silent-video'
						: w.fit === 'core-effects'
							? 'video-effects'
							: 'product-videos',
		});
	}
	return briefs;
}

function toMarkdown(report) {
	const lines = [];
	lines.push('# PopMyVideo keyword opportunities');
	lines.push('');
	lines.push(`Generated: ${report.generatedAt}`);
	lines.push(`Method: ${report.method}`);
	if (report.note) lines.push(`Note: ${report.note}`);
	lines.push('');
	lines.push(`Unique ideas: ${report.totals.unique} · Ranked: ${report.totals.ranked}`);
	lines.push('');
	lines.push('## Top opportunities');
	lines.push('');
	lines.push('| Keyword | Fit | Opp. | Demand | Comp. | Vol | Source |');
	lines.push('|---|---|---:|---:|---:|---:|---|');
	for (const r of report.topOpportunities) {
		lines.push(
			`| ${r.keyword} | ${r.fit} | ${r.opportunity} | ${r.demand} | ${r.competition} | ${r.volume ?? '—'} | ${r.source} |`,
		);
	}
	lines.push('');
	lines.push('## Content briefs (write next)');
	lines.push('');
	for (const b of report.contentBriefs) {
		lines.push(`### ${b.suggestedTitle}`);
		lines.push(`- Category: \`${b.categoryHint}\``);
		lines.push(`- Primary: **${b.primaryKeyword}**`);
		lines.push(`- Support: ${b.supportingKeywords.join(', ')}`);
		lines.push('');
	}
	lines.push('## How to plug in Keyword Planner volumes');
	lines.push('');
	lines.push('1. Google Ads → Tools → Keyword Planner → Discover new keywords');
	lines.push('2. Paste seeds from `scripts/keyword-research.mjs` (`SEEDS`)');
	lines.push('3. Download CSV → `research/keyword-planner.csv`');
	lines.push('4. `node scripts/keyword-research.mjs --ads-csv=research/keyword-planner.csv`');
	lines.push('');
	return lines.join('\n');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
