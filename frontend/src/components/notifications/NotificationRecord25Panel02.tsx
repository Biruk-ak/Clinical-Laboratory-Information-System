import { useEffect, useState, startTransition } from 'react';
import type { NotificationRecord25 } from '../../types/notifications25';
import { formatNotificationRecord25Label, isNotificationRecord25Active, compareNotificationRecord25ByPriority } from '../../types/notifications25';
import { listNotificationRecord25, archiveNotificationRecord25 } from '../../api/notifications25';

export interface NotificationRecord25Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: NotificationRecord25) => void;
}

/**
 * NotificationRecord25Panel02 — operational panel for notifications domain slice 25/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function NotificationRecord25Panel02({ facilityId, title = 'NotificationRecord25 Workspace', onSelect }: NotificationRecord25Panel02Props) {
  const [items, setItems] = useState<NotificationRecord25[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listNotificationRecord25(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareNotificationRecord25ByPriority));
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
    if (!isNotificationRecord25Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveNotificationRecord25(id);
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
              <span className="lis-panel__label">{formatNotificationRecord25Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} notifications records (slice 25-02)
      </footer>
    </section>
  );
}

export default NotificationRecord25Panel02;
