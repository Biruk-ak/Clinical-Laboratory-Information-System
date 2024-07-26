import { useEffect, useState, startTransition } from 'react';
import type { ReportRecord10 } from '../../types/reports10';
import { formatReportRecord10Label, isReportRecord10Active, compareReportRecord10ByPriority } from '../../types/reports10';
import { listReportRecord10, archiveReportRecord10 } from '../../api/reports10';

export interface ReportRecord10Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: ReportRecord10) => void;
}

/**
 * ReportRecord10Panel05 — operational panel for reports domain slice 10/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function ReportRecord10Panel05({ facilityId, title = 'ReportRecord10 Workspace', onSelect }: ReportRecord10Panel05Props) {
  const [items, setItems] = useState<ReportRecord10[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listReportRecord10(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareReportRecord10ByPriority));
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
    if (!isReportRecord10Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveReportRecord10(id);
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
              <span className="lis-panel__label">{formatReportRecord10Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} reports records (slice 10-05)
      </footer>
    </section>
  );
}

export default ReportRecord10Panel05;
