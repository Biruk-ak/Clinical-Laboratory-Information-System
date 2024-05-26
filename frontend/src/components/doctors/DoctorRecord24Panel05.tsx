import { useEffect, useState, startTransition } from 'react';
import type { DoctorRecord24 } from '../../types/doctors24';
import { formatDoctorRecord24Label, isDoctorRecord24Active, compareDoctorRecord24ByPriority } from '../../types/doctors24';
import { listDoctorRecord24, archiveDoctorRecord24 } from '../../api/doctors24';

export interface DoctorRecord24Panel05Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: DoctorRecord24) => void;
}

/**
 * DoctorRecord24Panel05 — operational panel for doctors domain slice 24/05.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function DoctorRecord24Panel05({ facilityId, title = 'DoctorRecord24 Workspace', onSelect }: DoctorRecord24Panel05Props) {
  const [items, setItems] = useState<DoctorRecord24[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listDoctorRecord24(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareDoctorRecord24ByPriority));
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
    if (!isDoctorRecord24Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveDoctorRecord24(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="lis-panel lis-panel--doctors" aria-label={title}>
      <header className="lis-panel__header">
        <h2>{title}</h2>
        <input
          className="lis-panel__search"
          placeholder="Filter records…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {loading && <p className="lis-panel__status">Loading doctors data…</p>}
      {error && <p className="lis-panel__error" role="alert">{error}</p>}
      <ul className="lis-panel__list">
        {filtered.map((item) => (
          <li key={item.id} className="lis-panel__item">
            <button type="button" className="lis-panel__select" onClick={() => onSelect?.(item)}>
              <span className="lis-panel__label">{formatDoctorRecord24Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} doctors records (slice 24-05)
      </footer>
    </section>
  );
}

export default DoctorRecord24Panel05;
