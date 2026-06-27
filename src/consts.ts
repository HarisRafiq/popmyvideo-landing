// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = 'https://popmyvideo.com';

export const STUDIO_NAME = 'ThinkingCats';
export const APP_NAME = 'PopMyVideo';
export const DEVELOPER_NAME = STUDIO_NAME;

export const SITE_TITLE = STUDIO_NAME;
export const SITE_DESCRIPTION =
	'ThinkingCats builds mobile tools for creators. PopMyVideo — auto captions, motion, and AI effects for Reels and Shorts. Android live — iOS waitlist open.';

export const PRODUCT_LOGO = '/popmyvideo-logo.png';

export const IOS_WAITLIST_SCRIPT_URL =
	'https://script.google.com/macros/s/AKfycbw3eEO0bvPWvruqysG4gXDMq1HwZ55QjDKzj8RCUM37lZmaTLZkboKw7fVYhcD-r9DLlQ/exec';

export const ANDROID_PACKAGE_ID = 'com.thinkingcats.catcut';
export const IOS_BUNDLE_ID = 'com.thinkingcats.catcut';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}`;

/** Opens the installed app on Android; falls back to Play Store in the browser. */
export const APP_LAUNCH_INTENT_URL = `intent://#Intent;package=${ANDROID_PACKAGE_ID};action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`;

/** Supabase redirect URL path — add https://popmyvideo.com/email-confirmed to Redirect URLs. */
export const EMAIL_CONFIRMED_PATH = '/email-confirmed';
