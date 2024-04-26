import { useEffect, useState, startTransition } from 'react';
import type { LabTestRecord20 } from '../../types/tests20';
import { formatLabTestRecord20Label, isLabTestRecord20Active, compareLabTestRecord20ByPriority } from '../../types/tests20';
import { listLabTestRecord20, archiveLabTestRecord20 } from '../../api/tests20';

export interface LabTestRecord20Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: LabTestRecord20) => void;
}

/**
 * LabTestRecord20Panel02 — operational panel for tests domain slice 20/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function LabTestRecord20Panel02({ facilityId, title = 'LabTestRecord20 Workspace', onSelect }: LabTestRecord20Panel02Props) {
  const [items, setItems] = useState<LabTestRecord20[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listLabTestRecord20(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareLabTestRecord20ByPriority));
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
    if (!isLabTestRecord20Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveLabTestRecord20(id);
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
              <span className="lis-panel__label">{formatLabTestRecord20Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} tests records (slice 20-02)
      </footer>
    </section>
  );
}

export default LabTestRecord20Panel02;
