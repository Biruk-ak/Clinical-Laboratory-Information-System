import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord17 } from '../../types/qualitycontrol17';
import { formatQualityControlRecord17Label, isQualityControlRecord17Active, compareQualityControlRecord17ByPriority } from '../../types/qualitycontrol17';
import { listQualityControlRecord17, archiveQualityControlRecord17 } from '../../api/qualitycontrol17';

export interface QualityControlRecord17Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord17) => void;
}

/**
 * QualityControlRecord17Panel03 — operational panel for qualitycontrol domain slice 17/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord17Panel03({ facilityId, title = 'QualityControlRecord17 Workspace', onSelect }: QualityControlRecord17Panel03Props) {
  const [items, setItems] = useState<QualityControlRecord17[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord17(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord17ByPriority));
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
    if (!isQualityControlRecord17Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord17(id);
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
              <span className="lis-panel__label">{formatQualityControlRecord17Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 17-03)
      </footer>
    </section>
  );
}

export default QualityControlRecord17Panel03;
