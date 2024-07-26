import { useEffect, useState, startTransition } from 'react';
import type { AnalyticsRecord16 } from '../../types/analytics16';
import { formatAnalyticsRecord16Label, isAnalyticsRecord16Active, compareAnalyticsRecord16ByPriority } from '../../types/analytics16';
import { listAnalyticsRecord16, archiveAnalyticsRecord16 } from '../../api/analytics16';

export interface AnalyticsRecord16Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AnalyticsRecord16) => void;
}

/**
 * AnalyticsRecord16Panel03 — operational panel for analytics domain slice 16/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AnalyticsRecord16Panel03({ facilityId, title = 'AnalyticsRecord16 Workspace', onSelect }: AnalyticsRecord16Panel03Props) {
  const [items, setItems] = useState<AnalyticsRecord16[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAnalyticsRecord16(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAnalyticsRecord16ByPriority));
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
    if (!isAnalyticsRecord16Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAnalyticsRecord16(id);
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
              <span className="lis-panel__label">{formatAnalyticsRecord16Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} analytics records (slice 16-03)
      </footer>
    </section>
  );
}

export default AnalyticsRecord16Panel03;
