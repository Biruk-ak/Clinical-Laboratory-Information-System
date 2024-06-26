import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord02 } from '../../types/qualitycontrol02';
import { formatQualityControlRecord02Label, isQualityControlRecord02Active, compareQualityControlRecord02ByPriority } from '../../types/qualitycontrol02';
import { listQualityControlRecord02, archiveQualityControlRecord02 } from '../../api/qualitycontrol02';

export interface QualityControlRecord02Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord02) => void;
}

/**
 * QualityControlRecord02Panel01 — operational panel for qualitycontrol domain slice 02/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord02Panel01({ facilityId, title = 'QualityControlRecord02 Workspace', onSelect }: QualityControlRecord02Panel01Props) {
  const [items, setItems] = useState<QualityControlRecord02[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord02(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord02ByPriority));
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
    if (!isQualityControlRecord02Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord02(id);
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
              <span className="lis-panel__label">{formatQualityControlRecord02Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 02-01)
      </footer>
    </section>
  );
}

export default QualityControlRecord02Panel01;
