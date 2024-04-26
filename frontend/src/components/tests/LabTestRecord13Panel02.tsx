import { useEffect, useState, startTransition } from 'react';
import type { LabTestRecord13 } from '../../types/tests13';
import { formatLabTestRecord13Label, isLabTestRecord13Active, compareLabTestRecord13ByPriority } from '../../types/tests13';
import { listLabTestRecord13, archiveLabTestRecord13 } from '../../api/tests13';

export interface LabTestRecord13Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: LabTestRecord13) => void;
}

/**
 * LabTestRecord13Panel02 — operational panel for tests domain slice 13/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function LabTestRecord13Panel02({ facilityId, title = 'LabTestRecord13 Workspace', onSelect }: LabTestRecord13Panel02Props) {
  const [items, setItems] = useState<LabTestRecord13[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listLabTestRecord13(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareLabTestRecord13ByPriority));
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
    if (!isLabTestRecord13Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveLabTestRecord13(id);
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
              <span className="lis-panel__label">{formatLabTestRecord13Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} tests records (slice 13-02)
      </footer>
    </section>
  );
}

export default LabTestRecord13Panel02;
