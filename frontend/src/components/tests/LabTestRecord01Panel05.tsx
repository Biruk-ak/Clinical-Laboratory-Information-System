import { useEffect, useState, startTransition } from 'react';
import type { LabTestRecord01 } from '../../types/tests01';
import { formatLabTestRecord01Label, isLabTestRecord01Active, compareLabTestRecord01ByPriority } from '../../types/tests01';
import { listLabTestRecord01, archiveLabTestRecord01 } from '../../api/tests01';

export interface LabTestRecord01Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: LabTestRecord01) => void;
}

/**
 * LabTestRecord01Panel05 — operational panel for tests domain slice 01/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function LabTestRecord01Panel05({ facilityId, title = 'LabTestRecord01 Workspace', onSelect }: LabTestRecord01Panel05Props) {
  const [items, setItems] = useState<LabTestRecord01[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listLabTestRecord01(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareLabTestRecord01ByPriority));
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
    if (!isLabTestRecord01Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveLabTestRecord01(id);
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
              <span className="lis-panel__label">{formatLabTestRecord01Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} tests records (slice 01-05)
      </footer>
    </section>
  );
}

export default LabTestRecord01Panel05;
