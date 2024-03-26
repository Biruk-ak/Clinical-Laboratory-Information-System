import { useEffect, useState, startTransition } from 'react';
import type { SampleRecord25 } from '../../types/samples25';
import { formatSampleRecord25Label, isSampleRecord25Active, compareSampleRecord25ByPriority } from '../../types/samples25';
import { listSampleRecord25, archiveSampleRecord25 } from '../../api/samples25';

export interface SampleRecord25Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: SampleRecord25) => void;
}

/**
 * SampleRecord25Panel01 — operational panel for samples domain slice 25/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function SampleRecord25Panel01({ facilityId, title = 'SampleRecord25 Workspace', onSelect }: SampleRecord25Panel01Props) {
  const [items, setItems] = useState<SampleRecord25[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listSampleRecord25(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareSampleRecord25ByPriority));
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
    if (!isSampleRecord25Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveSampleRecord25(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--samples" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading samples data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatSampleRecord25Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} samples records (slice 25-01)
      </footer>
    </section>
  );
}

export default SampleRecord25Panel01;
