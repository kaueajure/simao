import 'server-only';
import { cache } from 'react';
import { check } from '@/lib/errors';
import { supabase } from '@/lib/supabase/server';
import type { LocalRequest, City } from '@/lib/types';
import { placeDetails } from '@/lib/google/places';
export function date(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));
}
export function timestamp(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));
}
export async function citiesFor(requests: LocalRequest[]) {
  if (!requests.length) return new Map<number, City>();
  const db = await supabase();
  const rows = check(
    await db
      .from('cities')
      .select('*')
      .in('id', [...new Set(requests.map((r) => r.city_id))]),
  );
  return new Map(rows.map((c) => [c.id, c]));
}
export const livePlace = cache(async (id: string) => {
  const db = await supabase();
  const result = await db.from('places').select('*').eq('id', id).maybeSingle();
  if (!result.data) return null;
  try {
    check(await db.rpc('consume_api_limit', { p_bucket: 'places_details' }));
    return await placeDetails(result.data.google_place_id);
  } catch {
    return null;
  }
});
