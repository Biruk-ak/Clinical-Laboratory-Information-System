import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord26 } from '../../types/inventory26';
import { formatInventoryRecord26Label, isInventoryRecord26Active, compareInventoryRecord26ByPriority } from '../../types/inventory26';
import { listInventoryRecord26, archiveInventoryRecord26 } from '../../api/inventory26';

export interface InventoryRecord26Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord26) => void;
}

/**
 * InventoryRecord26Panel06 — operational panel for inventory domain slice 26/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord26Panel06({ facilityId, title = 'InventoryRecord26 Workspace', onSelect }: InventoryRecord26Panel06Props) {
  const [items, setItems] = useState<InventoryRecord26[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord26(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord26ByPriority));
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
    if (!isInventoryRecord26Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord26(id);
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
              <span className="lis-panel__label">{formatInventoryRecord26Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 26-06)
      </footer>
    </section>
  );
}

export default InventoryRecord26Panel06;
