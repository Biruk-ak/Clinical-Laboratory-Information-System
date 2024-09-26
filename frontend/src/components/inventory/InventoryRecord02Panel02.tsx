import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord02 } from '../../types/inventory02';
import { formatInventoryRecord02Label, isInventoryRecord02Active, compareInventoryRecord02ByPriority } from '../../types/inventory02';
import { listInventoryRecord02, archiveInventoryRecord02 } from '../../api/inventory02';

export interface InventoryRecord02Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord02) => void;
}

/**
 * InventoryRecord02Panel02 — operational panel for inventory domain slice 02/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord02Panel02({ facilityId, title = 'InventoryRecord02 Workspace', onSelect }: InventoryRecord02Panel02Props) {
  const [items, setItems] = useState<InventoryRecord02[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord02(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord02ByPriority));
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
    if (!isInventoryRecord02Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord02(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--inventory" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading inventory data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatInventoryRecord02Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 02-02)
      </footer>
    </section>
  );
}

export default InventoryRecord02Panel02;
