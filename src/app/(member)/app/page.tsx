import { ScrollableTabs } from '@/components/scrollable-tabs';
import Link from 'next/link';
import { pageNumber } from '@/lib/pagination';
import { member } from '@/server/auth';
import { check } from '@/lib/errors';
import { CitySelector } from '@/components/city-selector';
import { RequestCard } from '@/components/request-card';
import { Empty, Pagination } from '@/components/ui';
export const metadata = { title: 'Pergunte à cidade' };
export default async function Feed({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; q?: string; status?: string; page?: string }>;
}) {
  const { db, profile } = await member();
  const params = await searchParams;
  const cityId = Number(params.city) || profile.home_city_id;
  const page = pageNumber(params.page);
  const q = (params.q || '').trim().slice(0, 300);
  const status = params.status === 'RESOLVED' ? 'RESOLVED' : 'OPEN';
  const cityResult = await db.from('cities').select('*').eq('id', cityId).maybeSingle();
  const city =
    cityResult.data ||
    check(await db.from('cities').select('*').eq('id', profile.home_city_id).single());
  let query = db
    .from('requests')
    .select('*')
    .eq('city_id', city.id)
    .eq('status', status)
    .order('created_at', { ascending: false });
  if (q) query = query.textSearch('description', q, { type: 'websearch', config: 'portuguese' });
  const requests = check(await query.range((page - 1) * 20, page * 20));
  const more = requests.length > 20;
  return (
    <>
      <section className="app-intro">
        <p className="eyebrow">O conhecimento começa com uma pergunta</p>
        <div className="heading-action">
          <h1>
            O que você está
            <br className="mobile-break" /> procurando?
          </h1>
          <Link href={`/pedidos/novo?city=${city.id}`} className="button">
            Novo pedido +
          </Link>
        </div>
        <p className="muted">Pergunte à cidade ou ajude alguém a encontrar o caminho.</p>
      </section>
      <form className="feed-search" action="/app">
        <div className="field">
          <label htmlFor="query">Buscar pedidos</label>
          <input
            id="query"
            name="q"
            placeholder="O que você precisa encontrar?"
            defaultValue={q}
            maxLength={300}
          />
        </div>
        <CitySelector key={city.id} initial={city} name="city" />
        <input type="hidden" name="status" value={status} />
        <button className="button secondary">Buscar na cidade</button>
      </form>
      <div className="section-bar">
        <ScrollableTabs active={status} label="Filtrar solicitações">
          <Link
            className={status === 'OPEN' ? 'active' : ''}
            aria-current={status === 'OPEN' ? 'page' : undefined}
            href={'/app?' + new URLSearchParams({ city: String(city.id), q, status: 'OPEN' })}
          >
            Procurando
          </Link>
          <Link
            className={status === 'RESOLVED' ? 'active' : ''}
            aria-current={status === 'RESOLVED' ? 'page' : undefined}
            href={'/app?' + new URLSearchParams({ city: String(city.id), q, status: 'RESOLVED' })}
          >
            Descobertas confirmadas
          </Link>
        </ScrollableTabs>
        <span className="hint">
          {city.name} — {city.state_code}
        </span>
      </div>
      {requests.length ? (
        <div className="request-list">
          {requests.slice(0, 20).map((r) => (
            <RequestCard key={r.id} request={r} city={city} />
          ))}
        </div>
      ) : (
        <Empty
          title={
            q
              ? 'Nenhum pedido encontrado.'
              : status === 'OPEN'
                ? 'Ainda não há pedidos por aqui.'
                : 'A cidade ainda está construindo seu histórico.'
          }
        >
          <p>
            {status === 'OPEN'
              ? 'Que tal ser a primeira pessoa a perguntar?'
              : 'As descobertas aparecem quando alguém confirma onde encontrou.'}
          </p>
          <Link href={`/pedidos/novo?city=${city.id}`} className="text-link">
            Publicar um pedido ↗
          </Link>
        </Empty>
      )}
      <Pagination
        page={page}
        hasMore={more}
        base="/app"
        params={{ city: String(city.id), q, status }}
      />
    </>
  );
}
