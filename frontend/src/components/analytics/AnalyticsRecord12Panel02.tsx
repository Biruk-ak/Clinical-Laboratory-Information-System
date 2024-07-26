import { useEffect, useState, startTransition } from 'react';
import type { AnalyticsRecord12 } from '../../types/analytics12';
import { formatAnalyticsRecord12Label, isAnalyticsRecord12Active, compareAnalyticsRecord12ByPriority } from '../../types/analytics12';
import { listAnalyticsRecord12, archiveAnalyticsRecord12 } from '../../api/analytics12';

export interface AnalyticsRecord12Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AnalyticsRecord12) => void;
}

/**
 * AnalyticsRecord12Panel02 — operational panel for analytics domain slice 12/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AnalyticsRecord12Panel02({ facilityId, title = 'AnalyticsRecord12 Workspace', onSelect }: AnalyticsRecord12Panel02Props) {
  const [items, setItems] = useState<AnalyticsRecord12[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAnalyticsRecord12(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAnalyticsRecord12ByPriority));
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
    if (!isAnalyticsRecord12Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAnalyticsRecord12(id);
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
              <span className="lis-panel__label">{formatAnalyticsRecord12Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} analytics records (slice 12-02)
      </footer>
    </section>
  );
}

export default AnalyticsRecord12Panel02;
