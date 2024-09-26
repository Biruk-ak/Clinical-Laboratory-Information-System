import { useEffect, useState, startTransition } from 'react';
import type { AuthRecord05 } from '../../types/auth05';
import { formatAuthRecord05Label, isAuthRecord05Active, compareAuthRecord05ByPriority } from '../../types/auth05';
import { listAuthRecord05, archiveAuthRecord05 } from '../../api/auth05';

export interface AuthRecord05Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AuthRecord05) => void;
}

/**
 * AuthRecord05Panel04 — operational panel for auth domain slice 05/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AuthRecord05Panel04({ facilityId, title = 'AuthRecord05 Workspace', onSelect }: AuthRecord05Panel04Props) {
  const [items, setItems] = useState<AuthRecord05[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAuthRecord05(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAuthRecord05ByPriority));
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
    if (!isAuthRecord05Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAuthRecord05(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--auth" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading auth data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatAuthRecord05Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} auth records (slice 05-04)
      </footer>
    </section>
  );
}

export default AuthRecord05Panel04;
