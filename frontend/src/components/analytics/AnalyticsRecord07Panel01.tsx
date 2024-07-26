import { useEffect, useState, startTransition } from 'react';
import type { AnalyticsRecord07 } from '../../types/analytics07';
import { formatAnalyticsRecord07Label, isAnalyticsRecord07Active, compareAnalyticsRecord07ByPriority } from '../../types/analytics07';
import { listAnalyticsRecord07, archiveAnalyticsRecord07 } from '../../api/analytics07';

export interface AnalyticsRecord07Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AnalyticsRecord07) => void;
}

/**
 * AnalyticsRecord07Panel01 — operational panel for analytics domain slice 07/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AnalyticsRecord07Panel01({ facilityId, title = 'AnalyticsRecord07 Workspace', onSelect }: AnalyticsRecord07Panel01Props) {
  const [items, setItems] = useState<AnalyticsRecord07[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAnalyticsRecord07(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAnalyticsRecord07ByPriority));
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
    if (!isAnalyticsRecord07Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAnalyticsRecord07(id);
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
              <span className="lis-panel__label">{formatAnalyticsRecord07Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} analytics records (slice 07-01)
      </footer>
    </section>
  );
}

export default AnalyticsRecord07Panel01;
