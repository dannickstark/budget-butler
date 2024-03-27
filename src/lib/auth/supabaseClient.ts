import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		storageKey: 'Budget-Butler',
		storage: window.localStorage,
		flowType: 'pkce'
	}
});

export async function getSession() {
	let {
		data: { session: resSession }
	} = await supabase.auth.getSession();

	if (resSession) {
		return Promise.resolve(resSession);
	}

	return Promise.reject('No session');
}