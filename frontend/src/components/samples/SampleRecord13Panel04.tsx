import { useEffect, useState, startTransition } from 'react';
import type { SampleRecord13 } from '../../types/samples13';
import { formatSampleRecord13Label, isSampleRecord13Active, compareSampleRecord13ByPriority } from '../../types/samples13';
import { listSampleRecord13, archiveSampleRecord13 } from '../../api/samples13';

export interface SampleRecord13Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: SampleRecord13) => void;
}

/**
 * SampleRecord13Panel04 — operational panel for samples domain slice 13/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function SampleRecord13Panel04({ facilityId, title = 'SampleRecord13 Workspace', onSelect }: SampleRecord13Panel04Props) {
  const [items, setItems] = useState<SampleRecord13[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listSampleRecord13(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareSampleRecord13ByPriority));
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
    if (!isSampleRecord13Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveSampleRecord13(id);
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
              <span className="lis-panel__label">{formatSampleRecord13Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} samples records (slice 13-04)
      </footer>
    </section>
  );
}

export default SampleRecord13Panel04;
