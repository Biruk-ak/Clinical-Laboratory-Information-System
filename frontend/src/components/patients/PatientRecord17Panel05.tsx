import { useEffect, useState, startTransition } from 'react';
import type { PatientRecord17 } from '../../types/patients17';
import { formatPatientRecord17Label, isPatientRecord17Active, comparePatientRecord17ByPriority } from '../../types/patients17';
import { listPatientRecord17, archivePatientRecord17 } from '../../api/patients17';

export interface PatientRecord17Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: PatientRecord17) => void;
}

/**
 * PatientRecord17Panel05 — operational panel for patients domain slice 17/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function PatientRecord17Panel05({ facilityId, title = 'PatientRecord17 Workspace', onSelect }: PatientRecord17Panel05Props) {
  const [items, setItems] = useState<PatientRecord17[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listPatientRecord17(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(comparePatientRecord17ByPriority));
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
    if (!isPatientRecord17Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archivePatientRecord17(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--patients" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading patients data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatPatientRecord17Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} patients records (slice 17-05)
      </footer>
    </section>
  );
}

export default PatientRecord17Panel05;
