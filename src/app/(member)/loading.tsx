export default function Loading() {
  return (
    <div className="loading-state" role="status" aria-label="Carregando">
      <div className="skeleton skeleton-title" />
      <div className="skeleton" />
      <div className="skeleton" />
      <span>Carregando a cidade…</span>
    </div>
  );
}
