import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord24 } from '../../types/hospitals24';
import { formatHospitalRecord24Label, isHospitalRecord24Active, compareHospitalRecord24ByPriority } from '../../types/hospitals24';
import { listHospitalRecord24, archiveHospitalRecord24 } from '../../api/hospitals24';

export interface HospitalRecord24Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord24) => void;
}

/**
 * HospitalRecord24Panel03 — operational panel for hospitals domain slice 24/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord24Panel03({ facilityId, title = 'HospitalRecord24 Workspace', onSelect }: HospitalRecord24Panel03Props) {
  const [items, setItems] = useState<HospitalRecord24[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord24(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord24ByPriority));
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
    if (!isHospitalRecord24Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord24(id);
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
              <span className="lis-panel__label">{formatHospitalRecord24Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 24-03)
      </footer>
    </section>
  );
}

export default HospitalRecord24Panel03;
