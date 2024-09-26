import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord06 } from '../../types/inventory06';
import { formatInventoryRecord06Label, isInventoryRecord06Active, compareInventoryRecord06ByPriority } from '../../types/inventory06';
import { listInventoryRecord06, archiveInventoryRecord06 } from '../../api/inventory06';

export interface InventoryRecord06Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord06) => void;
}

/**
 * InventoryRecord06Panel01 — operational panel for inventory domain slice 06/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord06Panel01({ facilityId, title = 'InventoryRecord06 Workspace', onSelect }: InventoryRecord06Panel01Props) {
  const [items, setItems] = useState<InventoryRecord06[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord06(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord06ByPriority));
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
    if (!isInventoryRecord06Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord06(id);
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
              <span className="lis-panel__label">{formatInventoryRecord06Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 06-01)
      </footer>
    </section>
  );
}

export default InventoryRecord06Panel01;
