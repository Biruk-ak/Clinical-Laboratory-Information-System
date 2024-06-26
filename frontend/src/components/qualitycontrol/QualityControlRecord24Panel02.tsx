import { useEffect, useState, startTransition } from 'react';
import type { QualityControlRecord24 } from '../../types/qualitycontrol24';
import { formatQualityControlRecord24Label, isQualityControlRecord24Active, compareQualityControlRecord24ByPriority } from '../../types/qualitycontrol24';
import { listQualityControlRecord24, archiveQualityControlRecord24 } from '../../api/qualitycontrol24';

export interface QualityControlRecord24Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: QualityControlRecord24) => void;
}

/**
 * QualityControlRecord24Panel02 — operational panel for qualitycontrol domain slice 24/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function QualityControlRecord24Panel02({ facilityId, title = 'QualityControlRecord24 Workspace', onSelect }: QualityControlRecord24Panel02Props) {
  const [items, setItems] = useState<QualityControlRecord24[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listQualityControlRecord24(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareQualityControlRecord24ByPriority));
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
    if (!isQualityControlRecord24Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveQualityControlRecord24(id);
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
              <span className="lis-panel__label">{formatQualityControlRecord24Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} qualitycontrol records (slice 24-02)
      </footer>
    </section>
  );
}

export default QualityControlRecord24Panel02;
