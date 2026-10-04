import { normalizeCity } from './validation/schemas';

const states = new Set([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]);

export function citySearch(input: string): { query: string; state?: string } {
  const normalized = normalizeCity(input.slice(0, 60));
  const words = normalized.split(' ');
  const last = words.at(-1)?.toUpperCase();
  if (words.length > 1 && last && states.has(last)) {
    return { query: words.slice(0, -1).join(' '), state: last };
  }
  return { query: normalized };
}
