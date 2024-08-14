export function formatPercent45(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return '—';
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatTAT45(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export function clampPriority45(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function accessionLabel45(year: number, seq: number): string {
  return `ACC-45-${year}-${String(seq).padStart(6, '0')}`;
}
