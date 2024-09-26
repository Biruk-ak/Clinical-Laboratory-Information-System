import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord23 } from '../../types/inventory23';
import { formatInventoryRecord23Label, isInventoryRecord23Active, compareInventoryRecord23ByPriority } from '../../types/inventory23';
import { listInventoryRecord23, archiveInventoryRecord23 } from '../../api/inventory23';

export interface InventoryRecord23Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord23) => void;
}

/**
 * InventoryRecord23Panel06 — operational panel for inventory domain slice 23/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord23Panel06({ facilityId, title = 'InventoryRecord23 Workspace', onSelect }: InventoryRecord23Panel06Props) {
  const [items, setItems] = useState<InventoryRecord23[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord23(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord23ByPriority));
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
    if (!isInventoryRecord23Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord23(id);
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
              <span className="lis-panel__label">{formatInventoryRecord23Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 23-06)
      </footer>
    </section>
  );
}

export default InventoryRecord23Panel06;
