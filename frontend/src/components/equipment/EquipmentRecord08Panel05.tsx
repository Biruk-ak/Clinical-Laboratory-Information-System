import { useEffect, useState, startTransition } from 'react';
import type { EquipmentRecord08 } from '../../types/equipment08';
import { formatEquipmentRecord08Label, isEquipmentRecord08Active, compareEquipmentRecord08ByPriority } from '../../types/equipment08';
import { listEquipmentRecord08, archiveEquipmentRecord08 } from '../../api/equipment08';

export interface EquipmentRecord08Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: EquipmentRecord08) => void;
}

/**
 * EquipmentRecord08Panel05 — operational panel for equipment domain slice 08/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function EquipmentRecord08Panel05({ facilityId, title = 'EquipmentRecord08 Workspace', onSelect }: EquipmentRecord08Panel05Props) {
  const [items, setItems] = useState<EquipmentRecord08[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listEquipmentRecord08(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareEquipmentRecord08ByPriority));
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
    if (!isEquipmentRecord08Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveEquipmentRecord08(id);
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
              <span className="lis-panel__label">{formatEquipmentRecord08Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} equipment records (slice 08-05)
      </footer>
    </section>
  );
}

export default EquipmentRecord08Panel05;
