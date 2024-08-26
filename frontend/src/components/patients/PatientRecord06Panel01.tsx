import { useEffect, useState, startTransition } from 'react';
import type { PatientRecord06 } from '../../types/patients06';
import { formatPatientRecord06Label, isPatientRecord06Active, comparePatientRecord06ByPriority } from '../../types/patients06';
import { listPatientRecord06, archivePatientRecord06 } from '../../api/patients06';

export interface PatientRecord06Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: PatientRecord06) => void;
}

/**
 * PatientRecord06Panel01 — operational panel for patients domain slice 06/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function PatientRecord06Panel01({ facilityId, title = 'PatientRecord06 Workspace', onSelect }: PatientRecord06Panel01Props) {
  const [items, setItems] = useState<PatientRecord06[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listPatientRecord06(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(comparePatientRecord06ByPriority));
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
    if (!isPatientRecord06Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archivePatientRecord06(id);
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
              <span className="lis-panel__label">{formatPatientRecord06Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} patients records (slice 06-01)
      </footer>
    </section>
  );
}

export default PatientRecord06Panel01;
