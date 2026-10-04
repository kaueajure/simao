import Link from 'next/link';
import type { City, LocalRequest } from '@/lib/types';
import { Status } from './ui';
import { date } from '@/server/queries';
export function RequestCard({ request, city }: { request: LocalRequest; city?: City }) {
  return (
    <article className="request-row">
      <div>
        <div className="row-meta">
          <Status status={request.status} />
          <span>{date(request.created_at)}</span>
        </div>
        <h3>
          <Link href={'/pedidos/' + request.id}>{request.description}</Link>
        </h3>
        <p className="muted">
          {city ? `${city.name} — ${city.state_code}` : ''}
          {request.neighborhood ? ` · ${request.neighborhood}` : ''}
        </p>
      </div>
      <Link
        href={'/pedidos/' + request.id}
        className="request-count"
        aria-label={`Abrir pedido: ${request.description}. ${request.indication_count} indicações`}
      >
        {request.indication_count}
        <span>{request.indication_count === 1 ? 'indicação' : 'indicações'} ↗</span>
      </Link>
    </article>
  );
}
