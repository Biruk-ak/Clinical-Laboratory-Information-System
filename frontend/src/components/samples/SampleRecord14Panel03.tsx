import { useEffect, useState, startTransition } from 'react';
import type { SampleRecord14 } from '../../types/samples14';
import { formatSampleRecord14Label, isSampleRecord14Active, compareSampleRecord14ByPriority } from '../../types/samples14';
import { listSampleRecord14, archiveSampleRecord14 } from '../../api/samples14';

export interface SampleRecord14Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: SampleRecord14) => void;
}

/**
 * SampleRecord14Panel03 — operational panel for samples domain slice 14/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function SampleRecord14Panel03({ facilityId, title = 'SampleRecord14 Workspace', onSelect }: SampleRecord14Panel03Props) {
  const [items, setItems] = useState<SampleRecord14[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listSampleRecord14(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareSampleRecord14ByPriority));
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
    if (!isSampleRecord14Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveSampleRecord14(id);
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
              <span className="lis-panel__label">{formatSampleRecord14Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} samples records (slice 14-03)
      </footer>
    </section>
  );
}

export default SampleRecord14Panel03;
