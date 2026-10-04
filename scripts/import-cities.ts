import { writeFile } from 'node:fs/promises';
interface Municipality {
  id: number;
  nome: string;
  microrregiao: { mesorregiao: { UF: { sigla: string; nome: string } } } | null;
  'regiao-imediata': { 'regiao-intermediaria': { UF: { sigla: string; nome: string } } };
}
const response = await fetch(
  'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
  { signal: AbortSignal.timeout(30000) },
);
if (!response.ok) throw new Error('IBGE indisponível');
const rows = (await response.json()) as Municipality[];
const quote = (v: string) => "'" + v.replaceAll("'", "''") + "'";
const normalize = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
if (rows.length < 5500 || rows.some((r) => !Number.isInteger(r.id) || !r.nome))
  throw new Error('Catálogo IBGE incompleto');
const values = rows.map((r) => {
  const uf = r.microrregiao?.mesorregiao.UF || r['regiao-imediata']['regiao-intermediaria'].UF;
  return `(${r.id},${quote(r.nome)},${quote(normalize(r.nome))},${quote(uf.nome)},${quote(uf.sigla)},${quote(normalize(r.nome).replaceAll(' ', '-') + '-' + uf.sigla.toLowerCase())})`;
});
await writeFile(
  'supabase/migrations/202610040002_cities.sql',
  '-- Municípios oficiais do IBGE. Atualizado em 2026-10-04. País suportado pelo MVP: Brasil.\ninsert into public.cities(id,name,normalized_name,state_name,state_code,slug) values\n' +
    values.join(',\n') +
    '\non conflict(id) do update set name=excluded.name,normalized_name=excluded.normalized_name,state_name=excluded.state_name,state_code=excluded.state_code,slug=excluded.slug;\n',
);
console.log(`${rows.length} municípios oficiais gravados.`);
