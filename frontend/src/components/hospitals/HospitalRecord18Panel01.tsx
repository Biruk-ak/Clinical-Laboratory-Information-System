import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord18 } from '../../types/hospitals18';
import { formatHospitalRecord18Label, isHospitalRecord18Active, compareHospitalRecord18ByPriority } from '../../types/hospitals18';
import { listHospitalRecord18, archiveHospitalRecord18 } from '../../api/hospitals18';

export interface HospitalRecord18Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord18) => void;
}

/**
 * HospitalRecord18Panel01 — operational panel for hospitals domain slice 18/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord18Panel01({ facilityId, title = 'HospitalRecord18 Workspace', onSelect }: HospitalRecord18Panel01Props) {
  const [items, setItems] = useState<HospitalRecord18[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord18(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord18ByPriority));
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
    if (!isHospitalRecord18Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord18(id);
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
              <span className="lis-panel__label">{formatHospitalRecord18Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 18-01)
      </footer>
    </section>
  );
}

export default HospitalRecord18Panel01;
