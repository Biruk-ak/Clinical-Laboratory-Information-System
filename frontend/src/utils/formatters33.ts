export function formatPercent33(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return '—';
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatTAT33(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export function clampPriority33(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function accessionLabel33(year: number, seq: number): string {
  return `ACC-33-${year}-${String(seq).padStart(6, '0')}`;
}
