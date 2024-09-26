import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord10 } from '../../types/inventory10';
import { formatInventoryRecord10Label, isInventoryRecord10Active, compareInventoryRecord10ByPriority } from '../../types/inventory10';
import { listInventoryRecord10, archiveInventoryRecord10 } from '../../api/inventory10';

export interface InventoryRecord10Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord10) => void;
}

/**
 * InventoryRecord10Panel06 — operational panel for inventory domain slice 10/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord10Panel06({ facilityId, title = 'InventoryRecord10 Workspace', onSelect }: InventoryRecord10Panel06Props) {
  const [items, setItems] = useState<InventoryRecord10[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord10(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord10ByPriority));
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
    if (!isInventoryRecord10Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord10(id);
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
              <span className="lis-panel__label">{formatInventoryRecord10Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 10-06)
      </footer>
    </section>
  );
}

export default InventoryRecord10Panel06;
