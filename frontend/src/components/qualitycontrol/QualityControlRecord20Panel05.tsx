import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord20 } from '../../types/qualitycontrol20';
import { formatQualityControlRecord20Label, isQualityControlRecord20Active, compareQualityControlRecord20ByPriority } from '../../types/qualitycontrol20';
import { listQualityControlRecord20, archiveQualityControlRecord20 } from '../../api/qualitycontrol20';

export interface QualityControlRecord20Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord20) => void;
}

/**
 * QualityControlRecord20Panel05 — operational panel for qualitycontrol domain slice 20/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord20Panel05({ facilityId, title = 'QualityControlRecord20 Workspace', onSelect }: QualityControlRecord20Panel05Props) {
  const [items, setItems] = useState<QualityControlRecord20[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord20(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord20ByPriority));
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
    if (!isQualityControlRecord20Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord20(id);
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
              <span className="lis-panel__label">{formatQualityControlRecord20Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 20-05)
      </footer>
    </section>
  );
}

export default QualityControlRecord20Panel05;
