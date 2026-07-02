import { createClient } from '@supabase/supabase-js';

export function createBrowserSupabaseClient() {
	const url = import.meta.env.PUBLIC_SUPABASE_URL;
	const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

	if (!url || !anonKey) {
		throw new Error(
			'Missing Supabase env vars. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY for this site.',
		);
	}

	return createClient(url, anonKey, {
		auth: {
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: true,
		},
	});
}

