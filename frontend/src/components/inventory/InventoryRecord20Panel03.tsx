import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord20 } from '../../types/inventory20';
import { formatInventoryRecord20Label, isInventoryRecord20Active, compareInventoryRecord20ByPriority } from '../../types/inventory20';
import { listInventoryRecord20, archiveInventoryRecord20 } from '../../api/inventory20';

export interface InventoryRecord20Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord20) => void;
}

/**
 * InventoryRecord20Panel03 — operational panel for inventory domain slice 20/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord20Panel03({ facilityId, title = 'InventoryRecord20 Workspace', onSelect }: InventoryRecord20Panel03Props) {
  const [items, setItems] = useState<InventoryRecord20[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord20(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord20ByPriority));
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
    if (!isInventoryRecord20Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord20(id);
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
              <span className="lis-panel__label">{formatInventoryRecord20Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 20-03)
      </footer>
    </section>
  );
}

export default InventoryRecord20Panel03;
