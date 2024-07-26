import { useEffect, useState, startTransition } from 'react';
import type { ReportRecord04 } from '../../types/reports04';
import { formatReportRecord04Label, isReportRecord04Active, compareReportRecord04ByPriority } from '../../types/reports04';
import { listReportRecord04, archiveReportRecord04 } from '../../api/reports04';

export interface ReportRecord04Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: ReportRecord04) => void;
}

/**
 * ReportRecord04Panel06 — operational panel for reports domain slice 04/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function ReportRecord04Panel06({ facilityId, title = 'ReportRecord04 Workspace', onSelect }: ReportRecord04Panel06Props) {
  const [items, setItems] = useState<ReportRecord04[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listReportRecord04(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareReportRecord04ByPriority));
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
    if (!isReportRecord04Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveReportRecord04(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--reports" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading reports data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatReportRecord04Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} reports records (slice 04-06)
      </footer>
    </section>
  );
}

export default ReportRecord04Panel06;
