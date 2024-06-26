import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord19 } from '../../types/qualitycontrol19';
import { formatQualityControlRecord19Label, isQualityControlRecord19Active, compareQualityControlRecord19ByPriority } from '../../types/qualitycontrol19';
import { listQualityControlRecord19, archiveQualityControlRecord19 } from '../../api/qualitycontrol19';

export interface QualityControlRecord19Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord19) => void;
}

/**
 * QualityControlRecord19Panel03 — operational panel for qualitycontrol domain slice 19/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord19Panel03({ facilityId, title = 'QualityControlRecord19 Workspace', onSelect }: QualityControlRecord19Panel03Props) {
  const [items, setItems] = useState<QualityControlRecord19[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord19(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord19ByPriority));
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
    if (!isQualityControlRecord19Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord19(id);
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
              <span className="lis-panel__label">{formatQualityControlRecord19Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 19-03)
      </footer>
    </section>
  );
}

export default QualityControlRecord19Panel03;
