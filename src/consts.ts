// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = 'https://popmyvideo.com';

export const APP_NAME = 'PopMyVideo';
export const STUDIO_NAME = APP_NAME;
export const DEVELOPER_NAME = 'ThinkingCats';

export const SITE_TITLE = APP_NAME;
export const SITE_DESCRIPTION =
	'Turn any video into scroll-stopping content — from YouTube documentaries to TikTok Reels. Auto captions, motion graphics, and AI effects. No timeline. No editing skills. Free on Android.';

export const PRODUCT_LOGO = '/logo.png';
export const PRODUCT_LOGO_MARK = '/logo-mark.svg';
export const DEVELOPER_LOGO = '/thinkingcats-logo.png';

/** Brand palette — derived from the PopMyVideo logo (pink MY, purple play, cyan shards). */
export const BRAND = {
	pink: '#FF3D9A',
	magenta: '#E040FB',
	purple: '#7C3AED',
	cyan: '#00E5FF',
	blue: '#3B82F6',
} as const;

export const IOS_WAITLIST_SCRIPT_URL =
	'https://script.google.com/macros/s/AKfycbw3eEO0bvPWvruqysG4gXDMq1HwZ55QjDKzj8RCUM37lZmaTLZkboKw7fVYhcD-r9DLlQ/exec';

export const ANDROID_PACKAGE_ID = 'com.thinkingcats.catcut';
export const IOS_BUNDLE_ID = 'com.thinkingcats.catcut';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}`;

/** Opens the installed app on Android; falls back to Play Store in the browser. */
export const APP_LAUNCH_INTENT_URL = `intent://#Intent;package=${ANDROID_PACKAGE_ID};action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`;

/** Supabase redirect URL path — add https://popmyvideo.com/email-confirmed to Redirect URLs. */
export const EMAIL_CONFIRMED_PATH = '/email-confirmed';
