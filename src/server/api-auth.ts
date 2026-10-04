import 'server-only';
import { supabase } from '@/lib/supabase/server';
import { configured } from '@/lib/env';
export async function apiMember() {
  if (!configured()) return null;
  const db = await supabase();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user) return null;
  const state = await db.rpc('account_state');
  if (state.error || !state.data.onboarded) return null;
  return { db, user };
}
