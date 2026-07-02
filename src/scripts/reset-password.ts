import { createBrowserSupabaseClient } from '../lib/supabaseClient';

const form = document.getElementById('reset-form');
const btn = document.getElementById('submit');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const alertBox = document.getElementById('alert');
const alertText = document.getElementById('alert-text');
const nextSteps = document.getElementById('next-steps');
const openApp = document.getElementById('open-app');

type Variant = 'info' | 'success' | 'error';
type OtpType = 'recovery' | 'signup' | 'email';

const show = (message: string, variant: Variant = 'info') => {
	if (!(alertBox instanceof HTMLElement) || !(alertText instanceof HTMLElement)) return;
	alertBox.classList.remove('hidden');
	alertText.textContent = message;
	alertBox.style.borderColor =
		variant === 'error'
			? 'rgba(239,68,68,0.35)'
			: variant === 'success'
				? 'rgba(16,185,129,0.35)'
				: '';
	alertBox.style.background =
		variant === 'error'
			? 'rgba(239,68,68,0.08)'
			: variant === 'success'
				? 'rgba(16,185,129,0.08)'
				: '';
	alertText.style.color =
		variant === 'error'
			? 'rgb(252,165,165)'
			: variant === 'success'
				? 'rgb(110,231,183)'
				: '';
};

const setBusy = (busy: boolean) => {
	if (btn instanceof HTMLButtonElement) btn.disabled = busy;
	if (btn instanceof HTMLButtonElement) btn.textContent = busy ? 'Updating…' : 'Update password';
};

const parseParams = () => {
	const url = new URL(window.location.href);
	const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
	return {
		code: url.searchParams.get('code'),
		tokenHash: url.searchParams.get('token_hash') || hash.get('token_hash'),
		otpToken: url.searchParams.get('token') || hash.get('token'),
		email: url.searchParams.get('email') || hash.get('email'),
		error: url.searchParams.get('error') || hash.get('error'),
		errorDescription: url.searchParams.get('error_description') || hash.get('error_description'),
		accessToken: url.searchParams.get('access_token') || hash.get('access_token'),
		refreshToken: url.searchParams.get('refresh_token') || hash.get('refresh_token'),
		type: url.searchParams.get('type') || hash.get('type'),
	};
};

const sanitizeUrl = () => {
	const clean = new URL(window.location.href);
	clean.search = '';
	clean.hash = '';
	window.history.replaceState({}, '', clean.toString());
};

const codeVerifierStorageKey = () => {
	const url = import.meta.env.PUBLIC_SUPABASE_URL;
	if (!url) return null;
	const ref = new URL(url).hostname.split('.')[0];
	return `sb-${ref}-auth-token-code-verifier`;
};

const hasStoredPkceVerifier = () => {
	const key = codeVerifierStorageKey();
	if (!key) return false;
	try {
		return !!localStorage.getItem(key);
	} catch {
		return false;
	}
};

const toOtpType = (type: string | null): OtpType => {
	if (type === 'signup' || type === 'email' || type === 'recovery') return type;
	return 'recovery';
};

const showNextSteps = () => {
	if (nextSteps instanceof HTMLElement) nextSteps.classList.remove('hidden');

	if (!(openApp instanceof HTMLAnchorElement)) return;

	const ua = navigator.userAgent || '';
	const isAndroid = /Android/i.test(ua);
	const isIOS = /iPhone|iPad|iPod/i.test(ua);

	if (isAndroid) {
		const androidIntent = openApp.dataset.androidIntent;
		if (androidIntent) openApp.href = androidIntent;
		return;
	}

	if (isIOS) {
		openApp.href = '/#';
		openApp.addEventListener('click', (e) => {
			e.preventDefault();
			show('Open the PopMyVideo app on your iPhone and sign in with your new password.', 'success');
		});
		return;
	}

	const desktopFallback = openApp.dataset.desktopFallback || openApp.dataset.playStore;
	if (desktopFallback) openApp.href = desktopFallback;
};

let supabase: ReturnType<typeof createBrowserSupabaseClient> | undefined;
try {
	supabase = createBrowserSupabaseClient();
} catch (e) {
	show(e instanceof Error ? e.message : 'Supabase client failed to initialize.', 'error');
	if (form instanceof HTMLFormElement) form.classList.add('hidden');
}

const bootstrap = async () => {
	if (!supabase) return;

	const {
		code,
		tokenHash,
		otpToken,
		email,
		accessToken,
		refreshToken,
		error,
		errorDescription,
		type,
	} = parseParams();

	if (error) {
		show(errorDescription || 'This recovery link is invalid or expired.', 'error');
		if (form instanceof HTMLFormElement) form.classList.add('hidden');
		return;
	}

	try {
		const otpType = toOtpType(type);

		// Best for Flutter-initiated resets: email + 6-digit OTP (no PKCE verifier needed).
		if (email && otpToken) {
			const { error: verifyError } = await supabase.auth.verifyOtp({
				email,
				token: otpToken,
				type: otpType,
			});
			if (verifyError) throw verifyError;
		} else if (tokenHash) {
			const { error: verifyError } = await supabase.auth.verifyOtp({
				token_hash: tokenHash,
				type: otpType,
			});
			if (verifyError) throw verifyError;
		} else if (accessToken && refreshToken) {
			// Implicit-flow links with tokens in the URL hash.
			const { error: setSessionError } = await supabase.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			});
			if (setSessionError) throw setSessionError;
		} else if (code && hasStoredPkceVerifier()) {
			// PKCE only works in the same browser that requested the reset.
			const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
			if (exchangeError) throw exchangeError;
		} else if (code) {
			throw new Error(
				'This reset link cannot be opened here. Request a new password reset from the app, then open the new email link on this device.',
			);
		}

		const { data } = await supabase.auth.getSession();
		if (!data.session) {
			show('This recovery link is invalid or expired. Request a new one from the app.', 'error');
			if (form instanceof HTMLFormElement) form.classList.add('hidden');
			return;
		}

		sanitizeUrl();
		show('Link verified. Choose a new password below.', 'info');
	} catch (e: any) {
		show(e?.message || 'This recovery link is invalid or expired. Request a new one.', 'error');
		if (form instanceof HTMLFormElement) form.classList.add('hidden');
	}
};

bootstrap();

form?.addEventListener('submit', async (ev) => {
	ev.preventDefault();
	if (!supabase) return;
	if (!(password instanceof HTMLInputElement) || !(password2 instanceof HTMLInputElement)) return;

	const p1 = password.value;
	const p2 = password2.value;

	if (p1.length < 8) {
		show('Password must be at least 8 characters.', 'error');
		return;
	}
	if (p1 !== p2) {
		show("Passwords don't match.", 'error');
		return;
	}

	setBusy(true);
	try {
		const { error: updateError } = await supabase.auth.updateUser({ password: p1 });
		if (updateError) throw updateError;

		show('Password updated. Open the app and sign in with your new password.', 'success');
		showNextSteps();
		await supabase.auth.signOut();
		if (form instanceof HTMLFormElement) form.reset();
	} catch (e: any) {
		show(e?.message || 'Could not update password. Please request a new link and try again.', 'error');
	} finally {
		setBusy(false);
	}
});
