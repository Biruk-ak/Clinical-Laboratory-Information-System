import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord11 } from '../../types/qualitycontrol11';
import { formatQualityControlRecord11Label, isQualityControlRecord11Active, compareQualityControlRecord11ByPriority } from '../../types/qualitycontrol11';
import { listQualityControlRecord11, archiveQualityControlRecord11 } from '../../api/qualitycontrol11';

export interface QualityControlRecord11Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord11) => void;
}

/**
 * QualityControlRecord11Panel01 — operational panel for qualitycontrol domain slice 11/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord11Panel01({ facilityId, title = 'QualityControlRecord11 Workspace', onSelect }: QualityControlRecord11Panel01Props) {
  const [items, setItems] = useState<QualityControlRecord11[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord11(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord11ByPriority));
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
    if (!isQualityControlRecord11Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord11(id);
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
              <span className="lis-panel__label">{formatQualityControlRecord11Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 11-01)
      </footer>
    </section>
  );
}

export default QualityControlRecord11Panel01;
