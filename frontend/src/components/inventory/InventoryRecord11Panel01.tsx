import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord11 } from '../../types/inventory11';
import { formatInventoryRecord11Label, isInventoryRecord11Active, compareInventoryRecord11ByPriority } from '../../types/inventory11';
import { listInventoryRecord11, archiveInventoryRecord11 } from '../../api/inventory11';

export interface InventoryRecord11Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord11) => void;
}

/**
 * InventoryRecord11Panel01 — operational panel for inventory domain slice 11/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord11Panel01({ facilityId, title = 'InventoryRecord11 Workspace', onSelect }: InventoryRecord11Panel01Props) {
  const [items, setItems] = useState<InventoryRecord11[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord11(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord11ByPriority));
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
    if (!isInventoryRecord11Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord11(id);
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
              <span className="lis-panel__label">{formatInventoryRecord11Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 11-01)
      </footer>
    </section>
  );
}

export default InventoryRecord11Panel01;
