import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord22 } from '../../types/hospitals22';
import { formatHospitalRecord22Label, isHospitalRecord22Active, compareHospitalRecord22ByPriority } from '../../types/hospitals22';
import { listHospitalRecord22, archiveHospitalRecord22 } from '../../api/hospitals22';

export interface HospitalRecord22Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord22) => void;
}

/**
 * HospitalRecord22Panel04 — operational panel for hospitals domain slice 22/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord22Panel04({ facilityId, title = 'HospitalRecord22 Workspace', onSelect }: HospitalRecord22Panel04Props) {
  const [items, setItems] = useState<HospitalRecord22[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord22(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord22ByPriority));
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
    if (!isHospitalRecord22Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord22(id);
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
              <span className="lis-panel__label">{formatHospitalRecord22Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 22-04)
      </footer>
    </section>
  );
}

export default HospitalRecord22Panel04;
