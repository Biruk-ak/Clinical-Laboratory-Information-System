import { useEffect, useState, startTransition } from 'react';
import type { HospitalRecord13 } from '../../types/hospitals13';
import { formatHospitalRecord13Label, isHospitalRecord13Active, compareHospitalRecord13ByPriority } from '../../types/hospitals13';
import { listHospitalRecord13, archiveHospitalRecord13 } from '../../api/hospitals13';

export interface HospitalRecord13Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: HospitalRecord13) => void;
}

/**
 * HospitalRecord13Panel02 — operational panel for hospitals domain slice 13/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function HospitalRecord13Panel02({ facilityId, title = 'HospitalRecord13 Workspace', onSelect }: HospitalRecord13Panel02Props) {
  const [items, setItems] = useState<HospitalRecord13[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listHospitalRecord13(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareHospitalRecord13ByPriority));
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
    if (!isHospitalRecord13Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveHospitalRecord13(id);
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
              <span className="lis-panel__label">{formatHospitalRecord13Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} hospitals records (slice 13-02)
      </footer>
    </section>
  );
}

export default HospitalRecord13Panel02;
