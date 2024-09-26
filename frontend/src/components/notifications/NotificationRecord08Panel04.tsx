import { useEffect, useState, startTransition } from 'react';
import type { NotificationRecord08 } from '../../types/notifications08';
import { formatNotificationRecord08Label, isNotificationRecord08Active, compareNotificationRecord08ByPriority } from '../../types/notifications08';
import { listNotificationRecord08, archiveNotificationRecord08 } from '../../api/notifications08';

export interface NotificationRecord08Panel04Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: NotificationRecord08) => void;
}

/**
 * NotificationRecord08Panel04 — operational panel for notifications domain slice 08/04.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function NotificationRecord08Panel04({ facilityId, title = 'NotificationRecord08 Workspace', onSelect }: NotificationRecord08Panel04Props) {
  const [items, setItems] = useState<NotificationRecord08[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listNotificationRecord08(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareNotificationRecord08ByPriority));
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
    if (!isNotificationRecord08Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveNotificationRecord08(id);
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
              <span className="lis-panel__label">{formatNotificationRecord08Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} notifications records (slice 08-04)
      </footer>
    </section>
  );
}

export default NotificationRecord08Panel04;
