import { useEffect, useState, startTransition } from 'react';
import type { EquipmentRecord09 } from '../../types/equipment09';
import { formatEquipmentRecord09Label, isEquipmentRecord09Active, compareEquipmentRecord09ByPriority } from '../../types/equipment09';
import { listEquipmentRecord09, archiveEquipmentRecord09 } from '../../api/equipment09';

export interface EquipmentRecord09Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: EquipmentRecord09) => void;
}

/**
 * EquipmentRecord09Panel04 — operational panel for equipment domain slice 09/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function EquipmentRecord09Panel04({ facilityId, title = 'EquipmentRecord09 Workspace', onSelect }: EquipmentRecord09Panel04Props) {
  const [items, setItems] = useState<EquipmentRecord09[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listEquipmentRecord09(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareEquipmentRecord09ByPriority));
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
    if (!isEquipmentRecord09Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveEquipmentRecord09(id);
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
              <span className="lis-panel__label">{formatEquipmentRecord09Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} equipment records (slice 09-04)
      </footer>
    </section>
  );
}

export default EquipmentRecord09Panel04;
