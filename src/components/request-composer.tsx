'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CitySelector } from './city-selector';
import { ActionForm } from './action-form';
import { createRequest, editRequest } from '@/server/actions';
import type { City, LocalRequest } from '@/lib/types';
export function RequestComposer({ city, request }: { city: City; request?: LocalRequest }) {
  const [selected, setSelected] = useState<City | null>(city);
  const [description, setDescription] = useState(request?.description || '');
  const [matches, setMatches] = useState<LocalRequest[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  useEffect(() => {
    if (!selected || description.trim().length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setSearching(true);
      setSearchError('');
      try {
        const response = await fetch(
          `/api/resolved?cityId=${selected.id}&q=${encodeURIComponent(description)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error();
        const matches = (await response.json()) as LocalRequest[];
        if (!controller.signal.aborted) setMatches(matches);
      } catch {
        if (!controller.signal.aborted) {
          setMatches([]);
          setSearchError('A busca no histórico está indisponível. Você ainda pode publicar.');
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 600);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [description, selected]);
  return (
    <ActionForm
      action={request ? editRequest : createRequest}
      label={request ? 'Salvar pedido' : 'Publicar pedido'}
      pendingLabel="Publicando…"
      className="composer"
    >
      {request ? <input type="hidden" name="requestId" value={request.id} /> : null}
      <div className="field">
        <label htmlFor="description">O que você está procurando?</label>
        <textarea
          id="description"
          name="description"
          maxLength={300}
          minLength={3}
          rows={3}
          required
          value={description}
          placeholder="Uma peça de reposição, um ingrediente, um serviço…"
          onChange={(e) => {
            setDescription(e.target.value);
            setMatches([]);
            setSearching(false);
            setSearchError('');
          }}
        />
        <span className="hint count">{description.length}/300</span>
      </div>
      <CitySelector
        initial={city}
        onChange={(c) => {
          setSelected(c);
          setMatches([]);
          setSearching(false);
          setSearchError('');
        }}
      />
      <div className="field">
        <label htmlFor="neighborhood">
          Bairro ou região <span className="muted">(opcional)</span>
        </label>
        <input
          id="neighborhood"
          name="neighborhood"
          maxLength={100}
          defaultValue={request?.neighborhood || ''}
        />
      </div>
      {searching ? (
        <p className="hint" role="status">
          Procurando descobertas anteriores…
        </p>
      ) : null}
      {searchError ? (
        <p className="hint" role="status">
          {searchError}
        </p>
      ) : null}
      {matches.length && selected && description.length >= 3 ? (
        <aside className="reuse">
          <strong>Talvez alguém já tenha procurado algo parecido.</strong>
          <ul>
            {matches.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/pedidos/${r.id}`}
                  target="_blank"
                  onClick={() => {
                    void fetch('/api/analytics', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ event: 'SEARCH_REUSED' }),
                    });
                  }}
                >
                  {r.description} ↗
                </Link>
              </li>
            ))}
          </ul>
          <p className="hint">
            São descobertas da comunidade. A disponibilidade pode ter mudado. Você pode publicar
            mesmo assim.
          </p>
        </aside>
      ) : null}
    </ActionForm>
  );
}
