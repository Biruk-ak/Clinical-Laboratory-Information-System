import { useEffect, useState, startTransition } from 'react';
import type { LabTestRecord27 } from '../../types/tests27';
import { formatLabTestRecord27Label, isLabTestRecord27Active, compareLabTestRecord27ByPriority } from '../../types/tests27';
import { listLabTestRecord27, archiveLabTestRecord27 } from '../../api/tests27';

export interface LabTestRecord27Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: LabTestRecord27) => void;
}

/**
 * LabTestRecord27Panel04 — operational panel for tests domain slice 27/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function LabTestRecord27Panel04({ facilityId, title = 'LabTestRecord27 Workspace', onSelect }: LabTestRecord27Panel04Props) {
  const [items, setItems] = useState<LabTestRecord27[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listLabTestRecord27(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareLabTestRecord27ByPriority));
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
    if (!isLabTestRecord27Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveLabTestRecord27(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--tests" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading tests data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatLabTestRecord27Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} tests records (slice 27-04)
      </footer>
    </section>
  );
}

export default LabTestRecord27Panel04;
