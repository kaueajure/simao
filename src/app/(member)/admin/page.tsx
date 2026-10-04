import { ScrollableTabs } from '@/components/scrollable-tabs';
import Link from 'next/link';
import { pageNumber } from '@/lib/pagination';
import { administrator } from '@/server/auth';
import { check } from '@/lib/errors';
import { moderate } from '@/server/actions';
import { ActionForm } from '@/components/action-form';
import { Empty, Pagination, Status, GoogleAttribution, PlaceAttributions } from '@/components/ui';
import { timestamp, livePlace } from '@/server/queries';
import { uuid } from '@/lib/validation/schemas';
import { safeMapsUrl } from '@/lib/google/places';
export const metadata = { title: 'Administração' };
const tabs = {
  users: 'Usuários',
  requests: 'Pedidos',
  indications: 'Indicações',
  reports: 'Denúncias',
  rewards: 'Recompensas',
  logs: 'Logs',
  metrics: 'Métricas',
};
function Control({ id, action, label }: { id: string; action: string; label: string }) {
  return (
    <ActionForm
      action={moderate}
      label={label}
      className="compact quiet"
      confirm={`Confirmar: ${label}? A ação será registrada na auditoria.`}
    >
      <input type="hidden" name="targetId" value={id} />
      <input type="hidden" name="action" value={action} />
    </ActionForm>
  );
}
export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; q?: string; page?: string; target?: string }>;
}) {
  const { db } = await administrator();
  const params = await searchParams;
  const tab = params.tab && params.tab in tabs ? (params.tab as keyof typeof tabs) : 'reports';
  const q = (params.q || '').slice(0, 60);
  const page = pageNumber(params.page);
  const start = (page - 1) * 30;
  let body: React.ReactNode;
  let more = false;
  if (tab === 'users') {
    const rows = check(await db.rpc('admin_accounts', { p_search: q, p_offset: start }));
    more = rows.length === 30;
    body = rows.map((r) => (
      <article className="admin-row" key={r.id}>
        <div>
          <strong>{r.display_name || 'Onboarding pendente'}</strong>
          <p className="hint">
            @{r.username || 'sem username'} · {r.blocked ? 'Bloqueado' : 'Ativo'}
          </p>
          {r.username ? <Link href={'/perfil/' + r.username}>Ver perfil ↗</Link> : null}
        </div>
        <Control
          id={r.id}
          action={r.blocked ? 'UNBLOCK_USER' : 'BLOCK_USER'}
          label={r.blocked ? 'Desbloquear' : 'Bloquear'}
        />
      </article>
    ));
  } else if (tab === 'requests') {
    let query = db.from('requests').select('*').order('created_at', { ascending: false });
    if (q) query = query.ilike('description', '%' + q + '%');
    const rows = check(await query.range(start, start + 30));
    more = rows.length > 30;
    body = rows.slice(0, 30).map((r) => (
      <article className="admin-row" key={r.id}>
        <div>
          <Link href={'/pedidos/' + r.id}>
            <strong>{r.description}</strong>
          </Link>
          <p>
            <Status status={r.status} />
          </p>
          <p className="hint">
            {r.hidden_at ? 'Conteúdo removido' : 'Visível'} · {timestamp(r.created_at)}
          </p>
        </div>
        {!r.hidden_at ? <Control id={r.id} action="HIDE_REQUEST" label="Remover conteúdo" /> : null}
      </article>
    ));
  } else if (tab === 'indications') {
    let query = db.from('indications').select('*').order('created_at', { ascending: false });
    if (q) query = query.ilike('comment', '%' + q + '%');
    const selectedId = uuid.safeParse(params.target);
    if (selectedId.success) query = query.eq('id', selectedId.data);
    const rows = check(await query.range(start, start + 30));
    more = rows.length > 30;
    const selected = selectedId.success ? rows[0] : null;
    const place = selected ? await livePlace(selected.place_id) : null;
    const person = selected
      ? check(await db.from('profiles').select('*').eq('id', selected.user_id).single())
      : null;
    body = rows.slice(0, 30).map((r) => (
      <article className="admin-row" key={r.id}>
        <div>
          <Link href={'/pedidos/' + r.request_id}>Ver pedido ↗</Link>
          <p>{r.comment || 'Sem comentário'}</p>
          <p className="hint">
            Local: {r.place_id} · {timestamp(r.created_at)}
          </p>
          {selectedId.success ? (
            <>
              <p>
                {person?.display_name} · @{person?.username}
              </p>
              {place ? (
                <>
                  <strong>{place.displayName.text}</strong>
                  <p>{place.formattedAddress}</p>
                  <a href={safeMapsUrl(place)} target="_blank" rel="noopener noreferrer">
                    Ver no Google Maps ↗
                  </a>
                  <GoogleAttribution />
                  <PlaceAttributions place={place} />
                </>
              ) : (
                <p className="notice">Não foi possível consultar o estabelecimento agora.</p>
              )}
            </>
          ) : (
            <Link href={'/admin?tab=indications&target=' + r.id}>Inspecionar indicação ↗</Link>
          )}
        </div>
        {!r.hidden_at ? (
          <Control id={r.id} action="HIDE_INDICATION" label="Remover indicação" />
        ) : null}
      </article>
    ));
  } else if (tab === 'reports') {
    const rows = check(
      await db
        .from('reports')
        .select('*')
        .order('status')
        .order('created_at', { ascending: false })
        .range(start, start + 30),
    );
    more = rows.length > 30;
    body = rows.slice(0, 30).map((r) => (
      <article className="admin-row" key={r.id}>
        <div>
          <strong>
            {r.target_type === 'REQUEST' ? 'Pedido denunciado' : 'Indicação denunciada'}
          </strong>
          <p>{r.reason}</p>
          <p className="hint">
            {r.status === 'OPEN' ? 'Pendente' : 'Revisada'} · {timestamp(r.created_at)}
          </p>
          {r.target_type === 'REQUEST' ? (
            <Link href={'/pedidos/' + r.target_id}>Abrir pedido ↗</Link>
          ) : (
            <Link href={'/admin?tab=indications&target=' + r.target_id}>
              Inspecionar indicação ↗
            </Link>
          )}
        </div>
        <div>
          {r.status === 'OPEN' ? (
            <Control id={r.id} action="REVIEW_REPORT" label="Marcar revisada" />
          ) : null}
          <Control
            id={r.target_id}
            action={r.target_type === 'REQUEST' ? 'HIDE_REQUEST' : 'HIDE_INDICATION'}
            label="Remover conteúdo"
          />
        </div>
      </article>
    ));
  } else if (tab === 'rewards') {
    const rows = check(
      await db
        .from('reward_events')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, start + 30),
    );
    more = rows.length > 30;
    body = rows.slice(0, 30).map((r) => (
      <article className="admin-row" key={r.id}>
        <div>
          <strong>+{r.points} · Indicação confirmada</strong>
          <p className="hint">Usuário: {r.user_id}</p>
          <Link href={'/pedidos/' + r.request_id}>Ver solicitação ↗</Link>
          <p className="hint">
            {timestamp(r.created_at)} · Evento {r.id}
          </p>
        </div>
      </article>
    ));
  } else if (tab === 'logs') {
    const rows = check(
      await db
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, start + 30),
    );
    more = rows.length > 30;
    body = rows.slice(0, 30).map((r) => (
      <article className="admin-row" key={r.id}>
        <div>
          <strong>{r.event_type}</strong>
          <p className="hint">
            {r.entity_type} · {r.entity_id}
          </p>
          <p className="hint">{timestamp(r.created_at)}</p>
          <pre>{JSON.stringify(r.metadata, null, 2)}</pre>
        </div>
      </article>
    ));
  } else {
    const m = check(await db.rpc('admin_metrics'));
    body = (
      <div className="metrics">
        <p>
          Pedidos criados <strong>{m.requests}</strong>
        </p>
        <p>
          Receberam indicações{' '}
          <strong>{m.requests ? Math.round((100 * m.with_indications) / m.requests) : 0}%</strong>
        </p>
        <p>
          Resolvidos com local encontrado{' '}
          <strong>{m.requests ? Math.round((100 * m.resolved) / m.requests) : 0}%</strong>
        </p>
        <p>
          Pessoas que contribuíram <strong>{m.contributors}</strong>
        </p>
        <p>
          Tempo médio até a primeira indicação{' '}
          <strong>
            {m.avg_first_indication_seconds === null
              ? '—'
              : Math.round(m.avg_first_indication_seconds / 60) + ' min'}
          </strong>
        </p>
        <p>
          Tempo médio até resolução{' '}
          <strong>
            {m.avg_resolution_seconds === null
              ? '—'
              : Math.round(m.avg_resolution_seconds / 60) + ' min'}
          </strong>
        </p>
        <p>
          Visitas à landing <strong>{m.analytics.LANDING_VISIT || 0}</strong>
        </p>
        <p>
          Cliques para começar <strong>{m.analytics.CTA_CLICK || 0}</strong>
        </p>
        <p>
          Consultas a descobertas anteriores <strong>{m.analytics.SEARCH_REUSED || 0}</strong>
        </p>
      </div>
    );
  }
  return (
    <>
      <p className="eyebrow">Revisão humana, ações auditáveis</p>
      <h1>Administração</h1>
      <ScrollableTabs active={tab} label="Áreas administrativas" className="activity-tabs">
        {Object.entries(tabs).map(([key, label]) => (
          <Link
            key={key}
            href={'/admin?tab=' + key}
            className={tab === key ? 'active' : ''}
            aria-current={tab === key ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </ScrollableTabs>
      {['users', 'requests', 'indications'].includes(tab) ? (
        <form action="/admin" className="admin-search">
          <input type="hidden" name="tab" value={tab} />
          <label className="field">
            Pesquisar
            <input name="q" maxLength={60} defaultValue={q} />
          </label>
          <button className="button secondary">Buscar</button>
        </form>
      ) : null}
      {Array.isArray(body) && !body.length ? <Empty title="Nenhum registro para revisar." /> : body}
      <Pagination page={page} hasMore={more} base="/admin" params={{ tab, q }} />
    </>
  );
}
