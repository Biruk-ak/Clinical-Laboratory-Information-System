import { useEffect, useState, startTransition } from 'react';
import type { ReportRecord02 } from '../../types/reports02';
import { formatReportRecord02Label, isReportRecord02Active, compareReportRecord02ByPriority } from '../../types/reports02';
import { listReportRecord02, archiveReportRecord02 } from '../../api/reports02';

export interface ReportRecord02Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: ReportRecord02) => void;
}

/**
 * ReportRecord02Panel02 — operational panel for reports domain slice 02/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function ReportRecord02Panel02({ facilityId, title = 'ReportRecord02 Workspace', onSelect }: ReportRecord02Panel02Props) {
  const [items, setItems] = useState<ReportRecord02[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listReportRecord02(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareReportRecord02ByPriority));
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
    if (!isReportRecord02Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveReportRecord02(id);
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
              <span className="lis-panel__label">{formatReportRecord02Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} reports records (slice 02-02)
      </footer>
    </section>
  );
}

export default ReportRecord02Panel02;
