import { useEffect, useState, startTransition } from 'react';
import type { AnalyticsRecord14 } from '../../types/analytics14';
import { formatAnalyticsRecord14Label, isAnalyticsRecord14Active, compareAnalyticsRecord14ByPriority } from '../../types/analytics14';
import { listAnalyticsRecord14, archiveAnalyticsRecord14 } from '../../api/analytics14';

export interface AnalyticsRecord14Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AnalyticsRecord14) => void;
}

/**
 * AnalyticsRecord14Panel04 — operational panel for analytics domain slice 14/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AnalyticsRecord14Panel04({ facilityId, title = 'AnalyticsRecord14 Workspace', onSelect }: AnalyticsRecord14Panel04Props) {
  const [items, setItems] = useState<AnalyticsRecord14[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAnalyticsRecord14(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAnalyticsRecord14ByPriority));
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
    if (!isAnalyticsRecord14Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAnalyticsRecord14(id);
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
              <span className="lis-panel__label">{formatAnalyticsRecord14Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} analytics records (slice 14-04)
      </footer>
    </section>
  );
}

export default AnalyticsRecord14Panel04;
