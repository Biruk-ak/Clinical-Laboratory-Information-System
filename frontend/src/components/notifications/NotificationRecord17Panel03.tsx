import { useEffect, useState, startTransition } from 'react';
import type { NotificationRecord17 } from '../../types/notifications17';
import { formatNotificationRecord17Label, isNotificationRecord17Active, compareNotificationRecord17ByPriority } from '../../types/notifications17';
import { listNotificationRecord17, archiveNotificationRecord17 } from '../../api/notifications17';

export interface NotificationRecord17Panel03Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: NotificationRecord17) => void;
}

/**
 * NotificationRecord17Panel03 — operational panel for notifications domain slice 17/03.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function NotificationRecord17Panel03({ facilityId, title = 'NotificationRecord17 Workspace', onSelect }: NotificationRecord17Panel03Props) {
  const [items, setItems] = useState<NotificationRecord17[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listNotificationRecord17(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareNotificationRecord17ByPriority));
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
    if (!isNotificationRecord17Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveNotificationRecord17(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--notifications" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading notifications data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatNotificationRecord17Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} notifications records (slice 17-03)
      </footer>
    </section>
  );
}

export default NotificationRecord17Panel03;
