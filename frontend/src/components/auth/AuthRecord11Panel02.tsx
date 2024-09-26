import { useEffect, useState, startTransition } from 'react';
import type { AuthRecord11 } from '../../types/auth11';
import { formatAuthRecord11Label, isAuthRecord11Active, compareAuthRecord11ByPriority } from '../../types/auth11';
import { listAuthRecord11, archiveAuthRecord11 } from '../../api/auth11';

export interface AuthRecord11Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: AuthRecord11) => void;
}

/**
 * AuthRecord11Panel02 — operational panel for auth domain slice 11/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function AuthRecord11Panel02({ facilityId, title = 'AuthRecord11 Workspace', onSelect }: AuthRecord11Panel02Props) {
  const [items, setItems] = useState<AuthRecord11[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listAuthRecord11(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareAuthRecord11ByPriority));
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
    if (!isAuthRecord11Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveAuthRecord11(id);
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
              <span className="lis-panel__label">{formatAuthRecord11Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} auth records (slice 11-02)
      </footer>
    </section>
  );
}

export default AuthRecord11Panel02;
