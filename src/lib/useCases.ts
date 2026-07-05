import type { CategorySlug, UseCaseSlug } from './categories';

export interface UseCase {
	slug: UseCaseSlug;
	headline: string;
	body: string;
	before: string;
	after: string;
	note?: string;
	metaDescription: string;
	categorySlugs: CategorySlug[];
}

export const USE_CASES: UseCase[] = [
	{
		slug: 'silent-broll-ad',
		headline: 'Turn silent footage into a finished ad',
		body: 'Product shots, B-roll, and screen recordings without audio still need a hook, a CTA, and sound. PopMyVideo reads the visuals, adds text overlays and motion graphics on the action, and generates impacts and stings so the clip feels produced — not uploaded raw.',
		before: 'Mute product pan across a table',
		after: '"New drop" text lands on reveal + whoosh + price CTA',
		metaDescription:
			'Turn silent product footage into a social ad — text overlays, motion graphics, and sound effects on one clip. Export a finished Reel or ad from your phone.',
		categorySlugs: ['text-overlays', 'product-videos', 'silent-video'],
	},
	{
		slug: 'podcast-short',
		headline: 'Your clip already has the take. Add the retention layer.',
		body: 'Export a 30–90s highlight from Riverside, Descript, or YouTube. PopMyVideo listens to the speech, adds animated captions synced to every word, and places emphasis graphics on the punchlines — lower-thirds, bursts, and callouts that keep viewers watching on mute.',
		before: 'Static podcast face + quiet audio',
		after: 'Kinetic captions on the money quote + highlight effect',
		note: 'PopMyVideo polishes clips you\'ve already cut. It doesn\'t find viral moments in a full episode — yet.',
		metaDescription:
			'Polish podcast clips for Instagram and TikTok — animated captions and emphasis graphics on clips you have already exported. Not a clip finder.',
		categorySlugs: ['podcast-clips', 'auto-captions', 'animated-captions'],
	},
	{
		slug: 'talking-head',
		headline: 'Make people actually read what you\'re saying',
		body: 'Coaches, educators, and finance creators lose viewers when talking-head clips sit static on screen. PopMyVideo syncs animated captions to your voice and drops stat cards, checkmarks, and arrows on the claims that matter — timed to speech, placed in empty space, never covering your face.',
		before: '60s lecture clip, no graphics',
		after: 'Key stat pops in when you say the number',
		metaDescription:
			'Talking-head video editing with auto captions, stat cards, and callouts timed to speech — for coaches, educators, and finance creators.',
		categorySlugs: ['talking-head-videos', 'auto-captions', 'animated-captions'],
	},
	{
		slug: 'reels-tiktok',
		headline: 'The edit you\'d skip — without opening a timeline',
		body: 'You have a usable take. You don\'t have an hour for CapCut. Import one clip, tap analyze, preview captions and effects on beat, export vertical. Regenerate any moment you don\'t like with a simple prompt.',
		before: 'Raw vertical take',
		after: 'Captions + burst on the hook + export',
		metaDescription:
			'Polish one Reel or TikTok clip with auto captions and video effects — no timeline. Import, preview timed overlays, export vertical from your phone.',
		categorySlugs: ['video-effects', 'auto-captions'],
	},
];

export const USE_CASE_SLUGS = USE_CASES.map((u) => u.slug) as [UseCaseSlug, ...UseCaseSlug[]];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
	return USE_CASES.find((u) => u.slug === slug);
}
