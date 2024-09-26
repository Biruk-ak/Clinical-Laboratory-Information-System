import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord13 } from '../../types/inventory13';
import { formatInventoryRecord13Label, isInventoryRecord13Active, compareInventoryRecord13ByPriority } from '../../types/inventory13';
import { listInventoryRecord13, archiveInventoryRecord13 } from '../../api/inventory13';

export interface InventoryRecord13Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord13) => void;
}

/**
 * InventoryRecord13Panel01 — operational panel for inventory domain slice 13/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord13Panel01({ facilityId, title = 'InventoryRecord13 Workspace', onSelect }: InventoryRecord13Panel01Props) {
  const [items, setItems] = useState<InventoryRecord13[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord13(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord13ByPriority));
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
    if (!isInventoryRecord13Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord13(id);
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
              <span className="lis-panel__label">{formatInventoryRecord13Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 13-01)
      </footer>
    </section>
  );
}

export default InventoryRecord13Panel01;
