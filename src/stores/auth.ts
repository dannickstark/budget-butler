import type { User } from "@/db/users/schema";
import type { AuthSession } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export const session = writable<AuthSession>();
export const user = writable<User>();