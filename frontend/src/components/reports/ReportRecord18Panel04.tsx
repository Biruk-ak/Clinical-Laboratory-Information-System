import { useEffect, useState, startTransition } from 'react';
import type { ReportRecord18 } from '../../types/reports18';
import { formatReportRecord18Label, isReportRecord18Active, compareReportRecord18ByPriority } from '../../types/reports18';
import { listReportRecord18, archiveReportRecord18 } from '../../api/reports18';

export interface ReportRecord18Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: ReportRecord18) => void;
}

/**
 * ReportRecord18Panel04 — operational panel for reports domain slice 18/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function ReportRecord18Panel04({ facilityId, title = 'ReportRecord18 Workspace', onSelect }: ReportRecord18Panel04Props) {
  const [items, setItems] = useState<ReportRecord18[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listReportRecord18(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareReportRecord18ByPriority));
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
    if (!isReportRecord18Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveReportRecord18(id);
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
              <span className="lis-panel__label">{formatReportRecord18Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} reports records (slice 18-04)
      </footer>
    </section>
  );
}

export default ReportRecord18Panel04;
