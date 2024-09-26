import { useEffect, useState, startTransition } from 'react';
import type { InventoryRecord15 } from '../../types/inventory15';
import { formatInventoryRecord15Label, isInventoryRecord15Active, compareInventoryRecord15ByPriority } from '../../types/inventory15';
import { listInventoryRecord15, archiveInventoryRecord15 } from '../../api/inventory15';

export interface InventoryRecord15Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: InventoryRecord15) => void;
}

/**
 * InventoryRecord15Panel03 — operational panel for inventory domain slice 15/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function InventoryRecord15Panel03({ facilityId, title = 'InventoryRecord15 Workspace', onSelect }: InventoryRecord15Panel03Props) {
  const [items, setItems] = useState<InventoryRecord15[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listInventoryRecord15(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareInventoryRecord15ByPriority));
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
    if (!isInventoryRecord15Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveInventoryRecord15(id);
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
              <span className="lis-panel__label">{formatInventoryRecord15Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} inventory records (slice 15-03)
      </footer>
    </section>
  );
}

export default InventoryRecord15Panel03;
