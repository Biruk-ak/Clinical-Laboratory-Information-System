import { useEffect, useState, startTransition } from 'react';
import type { ResultRecord21 } from '../../types/results21';
import { formatResultRecord21Label, isResultRecord21Active, compareResultRecord21ByPriority } from '../../types/results21';
import { listResultRecord21, archiveResultRecord21 } from '../../api/results21';

export interface ResultRecord21Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: ResultRecord21) => void;
}

/**
 * ResultRecord21Panel01 — operational panel for results domain slice 21/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function ResultRecord21Panel01({ facilityId, title = 'ResultRecord21 Workspace', onSelect }: ResultRecord21Panel01Props) {
  const [items, setItems] = useState<ResultRecord21[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listResultRecord21(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareResultRecord21ByPriority));
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
    if (!isResultRecord21Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveResultRecord21(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--results" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading results data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatResultRecord21Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} results records (slice 21-01)
      </footer>
    </section>
  );
}

export default ResultRecord21Panel01;
