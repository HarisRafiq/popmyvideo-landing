export type CategorySlug =
	| 'auto-captions'
	| 'animated-captions'
	| 'video-effects'
	| 'text-overlays'
	| 'product-videos'
	| 'podcast-clips'
	| 'silent-video'
	| 'talking-head-videos';

export type UseCaseSlug = 'silent-broll-ad' | 'podcast-short' | 'talking-head' | 'reels-tiktok';

export interface Category {
	slug: CategorySlug;
	title: string;
	description: string;
	intro: string;
	keywords: string[];
	relatedUseCase?: UseCaseSlug;
}

export const CATEGORIES: Category[] = [
	{
		slug: 'auto-captions',
		title: 'Add Captions to Video',
		description:
			'How to add auto captions to phone video — animated text synced to speech for Reels, Shorts, and talking-head clips.',
		intro:
			'Captions are expected on mute. These guides cover adding auto captions to video on your phone — word-by-word animated text timed to speech, not static burned-in subtitles.',
		keywords: ['add captions to video', 'auto captions', 'burned-in captions'],
		relatedUseCase: 'talking-head',
	},
	{
		slug: 'animated-captions',
		title: 'Animated Captions for Video',
		description:
			'Animated captions vs plain subtitles — kinetic type synced to every word for Reels, TikTok, and Shorts retention.',
		intro:
			'Plain subtitles sit still. Animated captions move with your voice — emphasis on punchlines, hooks that hold attention on mute. Learn when motion matters and how to export captioned clips from your phone.',
		keywords: ['animated captions', 'subtitle generator', 'ai caption generator'],
		relatedUseCase: 'talking-head',
	},
	{
		slug: 'video-effects',
		title: 'Video Effects for Reels & Shorts',
		description:
			'Video effects timed to speech and action — bursts, sparks, and motion graphics for Reels and Shorts without After Effects.',
		intro:
			'Short-form effects work when they land on the beat — not random filters. These guides cover video effects for Reels and Shorts: timed bursts, captions, and polish layered on your original footage.',
		keywords: ['video effects', 'reels effects', 'video editing effects'],
		relatedUseCase: 'reels-tiktok',
	},
	{
		slug: 'text-overlays',
		title: 'Text Overlays for Video',
		description:
			'Text overlay video on iPhone and Android — CTAs, labels, and lower-thirds placed in negative space, timed to speech.',
		intro:
			'Text overlays that look produced — not 2010 annotations. CTAs, labels, and lower-thirds placed in empty space and timed to what you say or what happens on screen.',
		keywords: ['text overlay video', 'lower third', 'motion graphics app'],
		relatedUseCase: 'silent-broll-ad',
	},
	{
		slug: 'product-videos',
		title: 'Product Video Maker',
		description:
			'Turn silent product footage into a social ad — text overlays, motion graphics, and sound effects on one clip.',
		intro:
			'Product shots and B-roll without audio still need a hook and a CTA. These guides cover turning silent product footage into ad-ready Reels — text on the reveal, impacts on the action, export in minutes.',
		keywords: ['product video maker', 'add text to video', 'product video'],
		relatedUseCase: 'silent-broll-ad',
	},
	{
		slug: 'podcast-clips',
		title: 'Podcast Clips for Social Media',
		description:
			'Polish podcast clips for Instagram and TikTok — animated captions and emphasis graphics on clips you have already cut.',
		intro:
			'You already exported the highlight from Riverside or Descript. These guides cover the second step: captions, lower-thirds, and retention graphics on podcast clips for social media — not finding moments in a full episode.',
		keywords: ['podcast clips for social media', 'add captions to podcast clip'],
		relatedUseCase: 'podcast-short',
	},
	{
		slug: 'silent-video',
		title: 'Add Sound to Silent Video',
		description:
			'Add sound effects to silent video on your phone — impacts, whooshes, and stings timed to the action, not a random music track.',
		intro:
			'Silent B-roll and phone footage need sonic punctuation. These guides cover adding sound to silent video — generated impacts and stings placed on the hits, without scrubbing a multi-track timeline.',
		keywords: ['add sound to silent video', 'sound effects video', 'add music to video app'],
		relatedUseCase: 'silent-broll-ad',
	},
	{
		slug: 'talking-head-videos',
		title: 'Talking Head Video Editing',
		description:
			'Talking-head video editing for coaches and educators — auto captions, stat cards, and callouts timed to speech.',
		intro:
			'Talking-head clips lose viewers when nothing moves on screen. These guides cover captions, stat cards, checkmarks, and arrows on the claims that matter — placed in empty space, never covering your face.',
		keywords: ['talking head video editing', 'educational reels captions'],
		relatedUseCase: 'talking-head',
	},
];

export const FOOTER_CATEGORY_SLUGS: CategorySlug[] = [
	'auto-captions',
	'video-effects',
	'silent-video',
	'podcast-clips',
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

export function getCategoryBySlug(slug: string): Category | undefined {
	return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoriesForUseCase(useCaseSlug: UseCaseSlug): Category[] {
	return CATEGORIES.filter((c) => c.relatedUseCase === useCaseSlug);
}
