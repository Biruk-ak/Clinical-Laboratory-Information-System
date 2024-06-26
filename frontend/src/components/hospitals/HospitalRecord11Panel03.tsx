import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord11 } from '../../types/hospitals11';
import { formatHospitalRecord11Label, isHospitalRecord11Active, compareHospitalRecord11ByPriority } from '../../types/hospitals11';
import { listHospitalRecord11, archiveHospitalRecord11 } from '../../api/hospitals11';

export interface HospitalRecord11Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord11) => void;
}

/**
 * HospitalRecord11Panel03 — operational panel for hospitals domain slice 11/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord11Panel03({ facilityId, title = 'HospitalRecord11 Workspace', onSelect }: HospitalRecord11Panel03Props) {
  const [items, setItems] = useState<HospitalRecord11[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord11(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord11ByPriority));
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
    if (!isHospitalRecord11Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord11(id);
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
              <span className="lis-panel__label">{formatHospitalRecord11Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 11-03)
      </footer>
    </section>
  );
}

export default HospitalRecord11Panel03;
