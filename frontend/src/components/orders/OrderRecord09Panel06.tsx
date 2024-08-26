import { useEffect, useState, startTransition } from 'react';
import type { OrderRecord09 } from '../../types/orders09';
import { formatOrderRecord09Label, isOrderRecord09Active, compareOrderRecord09ByPriority } from '../../types/orders09';
import { listOrderRecord09, archiveOrderRecord09 } from '../../api/orders09';

export interface OrderRecord09Panel06Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: OrderRecord09) => void;
}

/**
 * OrderRecord09Panel06 — operational panel for orders domain slice 09/06.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function OrderRecord09Panel06({ facilityId, title = 'OrderRecord09 Workspace', onSelect }: OrderRecord09Panel06Props) {
  const [items, setItems] = useState<OrderRecord09[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listOrderRecord09(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareOrderRecord09ByPriority));
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
    if (!isOrderRecord09Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveOrderRecord09(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--orders" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading orders data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatOrderRecord09Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} orders records (slice 09-06)
      </footer>
    </section>
  );
}

export default OrderRecord09Panel06;
