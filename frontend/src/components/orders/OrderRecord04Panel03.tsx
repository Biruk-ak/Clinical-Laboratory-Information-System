import { useEffect, useState, startTransition } from 'react';
import type { OrderRecord04 } from '../../types/orders04';
import { formatOrderRecord04Label, isOrderRecord04Active, compareOrderRecord04ByPriority } from '../../types/orders04';
import { listOrderRecord04, archiveOrderRecord04 } from '../../api/orders04';

export interface OrderRecord04Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: OrderRecord04) => void;
}

/**
 * OrderRecord04Panel03 — operational panel for orders domain slice 04/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function OrderRecord04Panel03({ facilityId, title = 'OrderRecord04 Workspace', onSelect }: OrderRecord04Panel03Props) {
  const [items, setItems] = useState<OrderRecord04[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listOrderRecord04(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareOrderRecord04ByPriority));
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
    if (!isOrderRecord04Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveOrderRecord04(id);
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
              <span className="lis-panel__label">{formatOrderRecord04Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} orders records (slice 04-03)
      </footer>
    </section>
  );
}

export default OrderRecord04Panel03;
