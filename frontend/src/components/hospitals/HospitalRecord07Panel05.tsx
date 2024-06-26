import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord07 } from '../../types/hospitals07';
import { formatHospitalRecord07Label, isHospitalRecord07Active, compareHospitalRecord07ByPriority } from '../../types/hospitals07';
import { listHospitalRecord07, archiveHospitalRecord07 } from '../../api/hospitals07';

export interface HospitalRecord07Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord07) => void;
}

/**
 * HospitalRecord07Panel05 — operational panel for hospitals domain slice 07/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord07Panel05({ facilityId, title = 'HospitalRecord07 Workspace', onSelect }: HospitalRecord07Panel05Props) {
  const [items, setItems] = useState<HospitalRecord07[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord07(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord07ByPriority));
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
    if (!isHospitalRecord07Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord07(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--hospitals" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading hospitals data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatHospitalRecord07Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 07-05)
      </footer>
    </section>
  );
}

export default HospitalRecord07Panel05;
