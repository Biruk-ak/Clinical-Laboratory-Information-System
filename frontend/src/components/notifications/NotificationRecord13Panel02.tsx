import { useEffect, useState, startTransition } from 'react';
import type { NotificationRecord13 } from '../../types/notifications13';
import { formatNotificationRecord13Label, isNotificationRecord13Active, compareNotificationRecord13ByPriority } from '../../types/notifications13';
import { listNotificationRecord13, archiveNotificationRecord13 } from '../../api/notifications13';

export interface NotificationRecord13Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: NotificationRecord13) => void;
}

/**
 * NotificationRecord13Panel02 — operational panel for notifications domain slice 13/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function NotificationRecord13Panel02({ facilityId, title = 'NotificationRecord13 Workspace', onSelect }: NotificationRecord13Panel02Props) {
  const [items, setItems] = useState<NotificationRecord13[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listNotificationRecord13(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareNotificationRecord13ByPriority));
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
    if (!isNotificationRecord13Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveNotificationRecord13(id);
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
              <span className="lis-panel__label">{formatNotificationRecord13Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} notifications records (slice 13-02)
      </footer>
    </section>
  );
}

export default NotificationRecord13Panel02;
