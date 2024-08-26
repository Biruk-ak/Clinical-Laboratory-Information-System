import { useEffect, useState, startTransition } from 'react';
import type { BillingRecord20 } from '../../types/billing20';
import { formatBillingRecord20Label, isBillingRecord20Active, compareBillingRecord20ByPriority } from '../../types/billing20';
import { listBillingRecord20, archiveBillingRecord20 } from '../../api/billing20';

export interface BillingRecord20Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: BillingRecord20) => void;
}

/**
 * BillingRecord20Panel05 — operational panel for billing domain slice 20/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function BillingRecord20Panel05({ facilityId, title = 'BillingRecord20 Workspace', onSelect }: BillingRecord20Panel05Props) {
  const [items, setItems] = useState<BillingRecord20[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listBillingRecord20(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareBillingRecord20ByPriority));
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
    if (!isBillingRecord20Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveBillingRecord20(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--billing" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading billing data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatBillingRecord20Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} billing records (slice 20-05)
      </footer>
    </section>
  );
}

export default BillingRecord20Panel05;
