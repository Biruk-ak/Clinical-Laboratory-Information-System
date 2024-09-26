import { useEffect, useState, startTransition } from 'react';
import type { NotificationRecord03 } from '../../types/notifications03';
import { formatNotificationRecord03Label, isNotificationRecord03Active, compareNotificationRecord03ByPriority } from '../../types/notifications03';
import { listNotificationRecord03, archiveNotificationRecord03 } from '../../api/notifications03';

export interface NotificationRecord03Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: NotificationRecord03) => void;
}

/**
 * NotificationRecord03Panel01 — operational panel for notifications domain slice 03/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function NotificationRecord03Panel01({ facilityId, title = 'NotificationRecord03 Workspace', onSelect }: NotificationRecord03Panel01Props) {
  const [items, setItems] = useState<NotificationRecord03[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listNotificationRecord03(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareNotificationRecord03ByPriority));
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
    if (!isNotificationRecord03Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveNotificationRecord03(id);
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
              <span className="lis-panel__label">{formatNotificationRecord03Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} notifications records (slice 03-01)
      </footer>
    </section>
  );
}

export default NotificationRecord03Panel01;
