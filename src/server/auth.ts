import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase/server';
import { configured } from '@/lib/env';
export const session = cache(async () => {
  if (!configured()) redirect('/entrar?motivo=configuracao');
  const db = await supabase();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user) redirect('/entrar');
  const state = await db.rpc('account_state');
  if (state.error) {
    if (state.error.code === 'PGRST202' || state.error.code === '42P01')
      redirect('/entrar?motivo=banco');
    redirect('/entrar?motivo=bloqueado');
  }
  const profile = await db.from('profiles').select('*').eq('id', user.id).maybeSingle();
  return { db, user, profile: profile.data, admin: state.data.admin };
});
export const member = cache(async () => {
  const ctx = await session();
  if (!ctx.profile) redirect('/onboarding');
  return { ...ctx, profile: ctx.profile };
});
export async function administrator() {
  const ctx = await member();
  if (!ctx.admin) redirect('/app');
  return ctx;
}
