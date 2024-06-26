import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord06 } from '../../types/qualitycontrol06';
import { formatQualityControlRecord06Label, isQualityControlRecord06Active, compareQualityControlRecord06ByPriority } from '../../types/qualitycontrol06';
import { listQualityControlRecord06, archiveQualityControlRecord06 } from '../../api/qualitycontrol06';

export interface QualityControlRecord06Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord06) => void;
}

/**
 * QualityControlRecord06Panel03 — operational panel for qualitycontrol domain slice 06/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord06Panel03({ facilityId, title = 'QualityControlRecord06 Workspace', onSelect }: QualityControlRecord06Panel03Props) {
  const [items, setItems] = useState<QualityControlRecord06[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord06(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord06ByPriority));
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
    if (!isQualityControlRecord06Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord06(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--qualitycontrol" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading qualitycontrol data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatQualityControlRecord06Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 06-03)
      </footer>
    </section>
  );
}

export default QualityControlRecord06Panel03;
