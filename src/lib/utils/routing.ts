import { goto } from "$app/navigation";
import type { Session } from "@supabase/supabase-js";


export function redirectUI(path: string, session: Session, introShowed: boolean) {
    if (session) {
        if (!introShowed) {
            if(path != '/intro') goto('/intro');
        } else {
            if(path != '/app') goto('/app');
        }
    } else {
        if(path != '/signup') goto('/signup');
    }
}