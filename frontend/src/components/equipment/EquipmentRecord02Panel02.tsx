import { useEffect, useState, startTransition } from 'react';
import type { EquipmentRecord02 } from '../../types/equipment02';
import { formatEquipmentRecord02Label, isEquipmentRecord02Active, compareEquipmentRecord02ByPriority } from '../../types/equipment02';
import { listEquipmentRecord02, archiveEquipmentRecord02 } from '../../api/equipment02';

export interface EquipmentRecord02Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: EquipmentRecord02) => void;
}

/**
 * EquipmentRecord02Panel02 — operational panel for equipment domain slice 02/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function EquipmentRecord02Panel02({ facilityId, title = 'EquipmentRecord02 Workspace', onSelect }: EquipmentRecord02Panel02Props) {
  const [items, setItems] = useState<EquipmentRecord02[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listEquipmentRecord02(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareEquipmentRecord02ByPriority));
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
    if (!isEquipmentRecord02Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveEquipmentRecord02(id);
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
              <span className="lis-panel__label">{formatEquipmentRecord02Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} equipment records (slice 02-02)
      </footer>
    </section>
  );
}

export default EquipmentRecord02Panel02;
