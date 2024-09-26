import { useEffect, useState, startTransition } from 'react';
import type { AuthRecord24 } from '../../types/auth24';
import { formatAuthRecord24Label, isAuthRecord24Active, compareAuthRecord24ByPriority } from '../../types/auth24';
import { listAuthRecord24, archiveAuthRecord24 } from '../../api/auth24';

export interface AuthRecord24Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AuthRecord24) => void;
}

/**
 * AuthRecord24Panel05 — operational panel for auth domain slice 24/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AuthRecord24Panel05({ facilityId, title = 'AuthRecord24 Workspace', onSelect }: AuthRecord24Panel05Props) {
  const [items, setItems] = useState<AuthRecord24[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAuthRecord24(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAuthRecord24ByPriority));
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
    if (!isAuthRecord24Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAuthRecord24(id);
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
              <span className="lis-panel__label">{formatAuthRecord24Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} auth records (slice 24-05)
      </footer>
    </section>
  );
}

export default AuthRecord24Panel05;
