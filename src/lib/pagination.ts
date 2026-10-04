export function pageNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(1, Math.min(1000, Math.floor(parsed) || 1)) : 1;
}
