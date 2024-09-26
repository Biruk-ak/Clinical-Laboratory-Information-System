import { useEffect, useState, startTransition } from 'react';
import type { AuthRecord25 } from '../../types/auth25';
import { formatAuthRecord25Label, isAuthRecord25Active, compareAuthRecord25ByPriority } from '../../types/auth25';
import { listAuthRecord25, archiveAuthRecord25 } from '../../api/auth25';

export interface AuthRecord25Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AuthRecord25) => void;
}

/**
 * AuthRecord25Panel05 — operational panel for auth domain slice 25/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AuthRecord25Panel05({ facilityId, title = 'AuthRecord25 Workspace', onSelect }: AuthRecord25Panel05Props) {
  const [items, setItems] = useState<AuthRecord25[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAuthRecord25(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAuthRecord25ByPriority));
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
    if (!isAuthRecord25Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAuthRecord25(id);
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
              <span className="lis-panel__label">{formatAuthRecord25Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} auth records (slice 25-05)
      </footer>
    </section>
  );
}

export default AuthRecord25Panel05;
