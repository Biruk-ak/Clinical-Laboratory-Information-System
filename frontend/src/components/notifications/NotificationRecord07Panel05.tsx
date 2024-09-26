import { useEffect, useState, startTransition } from 'react';
import type { NotificationRecord07 } from '../../types/notifications07';
import { formatNotificationRecord07Label, isNotificationRecord07Active, compareNotificationRecord07ByPriority } from '../../types/notifications07';
import { listNotificationRecord07, archiveNotificationRecord07 } from '../../api/notifications07';

export interface NotificationRecord07Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: NotificationRecord07) => void;
}

/**
 * NotificationRecord07Panel05 — operational panel for notifications domain slice 07/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function NotificationRecord07Panel05({ facilityId, title = 'NotificationRecord07 Workspace', onSelect }: NotificationRecord07Panel05Props) {
  const [items, setItems] = useState<NotificationRecord07[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listNotificationRecord07(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareNotificationRecord07ByPriority));
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
    if (!isNotificationRecord07Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveNotificationRecord07(id);
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
              <span className="lis-panel__label">{formatNotificationRecord07Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} notifications records (slice 07-05)
      </footer>
    </section>
  );
}

export default NotificationRecord07Panel05;
