import { useEffect, useState, startTransition } from 'react';
import type { BillingRecord15 } from '../../types/billing15';
import { formatBillingRecord15Label, isBillingRecord15Active, compareBillingRecord15ByPriority } from '../../types/billing15';
import { listBillingRecord15, archiveBillingRecord15 } from '../../api/billing15';

export interface BillingRecord15Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: BillingRecord15) => void;
}

/**
 * BillingRecord15Panel03 — operational panel for billing domain slice 15/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function BillingRecord15Panel03({ facilityId, title = 'BillingRecord15 Workspace', onSelect }: BillingRecord15Panel03Props) {
  const [items, setItems] = useState<BillingRecord15[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listBillingRecord15(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareBillingRecord15ByPriority));
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
    if (!isBillingRecord15Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveBillingRecord15(id);
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
              <span className="lis-panel__label">{formatBillingRecord15Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} billing records (slice 15-03)
      </footer>
    </section>
  );
}

export default BillingRecord15Panel03;
