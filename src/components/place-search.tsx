'use client';
import { useState, useRef, useEffect } from 'react';
import { ActionForm } from './action-form';
import { GoogleAttribution } from './ui';
import { indicate } from '@/server/actions';
interface Prediction {
  id: string;
  label: string;
}
export function PlaceSearch({
  requestId,
  cityId,
  cityName,
}: {
  requestId: string;
  cityId: number;
  cityName: string;
}) {
  const [input, setInput] = useState('');
  const [token] = useState(() => crypto.randomUUID());
  const [results, setResults] = useState<Prediction[]>([]);
  const [selected, setSelected] = useState<Prediction | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function search() {
    if (busy || input.trim().length < 3) return;
    const controller = new AbortController();
    request.current?.abort();
    request.current = controller;
    setBusy(true);
    setError('');
    setResults([]);
    try {
      const response = await fetch(
        '/api/places?' +
          new URLSearchParams({ input, cityId: String(cityId), sessionToken: token }),
        { signal: controller.signal },
      );
      const data = (await response.json()) as Prediction[] | { error: string };
      if (!response.ok || !Array.isArray(data))
        throw new Error(!Array.isArray(data) ? data.error : 'Não foi possível buscar.');
      if (!controller.signal.aborted) {
        setResults(data);
        if (!data.length) setError('Nenhum estabelecimento encontrado. Tente outro nome.');
      }
    } catch (e) {
      if (!controller.signal.aborted) {
        setError(
          e instanceof Error && !(e instanceof TypeError) && !(e instanceof SyntaxError)
            ? e.message
            : 'Não foi possível buscar agora. Tente novamente.',
        );
      }
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  }
  return (
    <div>
      <p className="muted">
        Indique um estabelecimento em {cityName} que você conhece. A localização será verificada
        antes do envio.
      </p>
      <div className="field">
        <label htmlFor="place-search">Nome do estabelecimento</label>
        <div className="input-with-button">
          <input
            id="place-search"
            value={input}
            maxLength={120}
            placeholder="Busque pelo nome do lugar"
            onChange={(e) => {
              request.current?.abort();
              setInput(e.target.value);
              setSelected(null);
              setResults([]);
              setError('');
              setBusy(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void search();
              }
            }}
          />
          <button
            className="button secondary"
            type="button"
            disabled={busy || input.trim().length < 3}
            onClick={search}
          >
            {busy ? 'Buscando…' : 'Buscar'}
          </button>
        </div>
      </div>
      {error ? (
        <p className="notice error" role="alert">
          {error}
        </p>
      ) : null}
      {results.length ? (
        <ul className="search-results">
          {results.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                data-place-id={p.id}
                onClick={() => {
                  setSelected(p);
                  setResults([]);
                }}
              >
                {p.label}
                <span>Selecionar</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <GoogleAttribution />
      {selected ? (
        <div className="selected-place">
          <p className="eyebrow">Local selecionado</p>
          <strong>{selected.label}</strong>
          <ActionForm action={indicate} label="Confirmar indicação" pendingLabel="Validando local…">
            <input type="hidden" name="requestId" value={requestId} />
            <input type="hidden" name="googlePlaceId" value={selected.id} />
            <input type="hidden" name="sessionToken" value={token} />
            <div className="field">
              <label htmlFor="comment">
                Como você sabe? <span className="muted">(opcional)</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                maxLength={300}
                rows={3}
                placeholder="Por exemplo: comprei lá na semana passada."
              />
            </div>
            <p className="hint">
              Você pode indicar uma vez neste pedido. O local não poderá ser trocado após o envio.
            </p>
          </ActionForm>
        </div>
      ) : null}
    </div>
  );
}
