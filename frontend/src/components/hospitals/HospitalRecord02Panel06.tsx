import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord02 } from '../../types/hospitals02';
import { formatHospitalRecord02Label, isHospitalRecord02Active, compareHospitalRecord02ByPriority } from '../../types/hospitals02';
import { listHospitalRecord02, archiveHospitalRecord02 } from '../../api/hospitals02';

export interface HospitalRecord02Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord02) => void;
}

/**
 * HospitalRecord02Panel06 — operational panel for hospitals domain slice 02/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord02Panel06({ facilityId, title = 'HospitalRecord02 Workspace', onSelect }: HospitalRecord02Panel06Props) {
  const [items, setItems] = useState<HospitalRecord02[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord02(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord02ByPriority));
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
    if (!isHospitalRecord02Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord02(id);
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
              <span className="lis-panel__label">{formatHospitalRecord02Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 02-06)
      </footer>
    </section>
  );
}

export default HospitalRecord02Panel06;
