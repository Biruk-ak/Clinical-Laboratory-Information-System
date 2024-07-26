import { useEffect, useState, startTransition } from 'react';
import type { AnalyticsRecord21 } from '../../types/analytics21';
import { formatAnalyticsRecord21Label, isAnalyticsRecord21Active, compareAnalyticsRecord21ByPriority } from '../../types/analytics21';
import { listAnalyticsRecord21, archiveAnalyticsRecord21 } from '../../api/analytics21';

export interface AnalyticsRecord21Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AnalyticsRecord21) => void;
}

/**
 * AnalyticsRecord21Panel06 — operational panel for analytics domain slice 21/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AnalyticsRecord21Panel06({ facilityId, title = 'AnalyticsRecord21 Workspace', onSelect }: AnalyticsRecord21Panel06Props) {
  const [items, setItems] = useState<AnalyticsRecord21[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAnalyticsRecord21(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAnalyticsRecord21ByPriority));
          setError(null);
        });
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [facilityId]);

  const filtered = items.filter((item) => {
    if (!isAnalyticsRecord21Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAnalyticsRecord21(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--analytics" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading analytics data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatAnalyticsRecord21Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} analytics records (slice 21-06)
      </footer>
    </section>
  );
}

export default AnalyticsRecord21Panel06;
