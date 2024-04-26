import { useEffect, useState, startTransition } from 'react';
import type { LabTestRecord04 } from '../../types/tests04';
import { formatLabTestRecord04Label, isLabTestRecord04Active, compareLabTestRecord04ByPriority } from '../../types/tests04';
import { listLabTestRecord04, archiveLabTestRecord04 } from '../../api/tests04';

export interface LabTestRecord04Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: LabTestRecord04) => void;
}

/**
 * LabTestRecord04Panel03 — operational panel for tests domain slice 04/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function LabTestRecord04Panel03({ facilityId, title = 'LabTestRecord04 Workspace', onSelect }: LabTestRecord04Panel03Props) {
  const [items, setItems] = useState<LabTestRecord04[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listLabTestRecord04(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareLabTestRecord04ByPriority));
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
    if (!isLabTestRecord04Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveLabTestRecord04(id);
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
              <span className="lis-panel__label">{formatLabTestRecord04Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} tests records (slice 04-03)
      </footer>
    </section>
  );
}

export default LabTestRecord04Panel03;
