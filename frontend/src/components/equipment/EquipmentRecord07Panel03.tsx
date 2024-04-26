import { useEffect, useState, startTransition } from 'react';
import type { EquipmentRecord07 } from '../../types/equipment07';
import { formatEquipmentRecord07Label, isEquipmentRecord07Active, compareEquipmentRecord07ByPriority } from '../../types/equipment07';
import { listEquipmentRecord07, archiveEquipmentRecord07 } from '../../api/equipment07';

export interface EquipmentRecord07Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: EquipmentRecord07) => void;
}

/**
 * EquipmentRecord07Panel03 — operational panel for equipment domain slice 07/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function EquipmentRecord07Panel03({ facilityId, title = 'EquipmentRecord07 Workspace', onSelect }: EquipmentRecord07Panel03Props) {
  const [items, setItems] = useState<EquipmentRecord07[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listEquipmentRecord07(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareEquipmentRecord07ByPriority));
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
    if (!isEquipmentRecord07Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveEquipmentRecord07(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--equipment" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading equipment data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatEquipmentRecord07Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} equipment records (slice 07-03)
      </footer>
    </section>
  );
}

export default EquipmentRecord07Panel03;
