import { useEffect, useState, startTransition } from 'react';
import type { DoctorRecord23 } from '../../types/doctors23';
import { formatDoctorRecord23Label, isDoctorRecord23Active, compareDoctorRecord23ByPriority } from '../../types/doctors23';
import { listDoctorRecord23, archiveDoctorRecord23 } from '../../api/doctors23';

export interface DoctorRecord23Panel01Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: DoctorRecord23) => void;
}

/**
 * DoctorRecord23Panel01 — operational panel for doctors domain slice 23/01.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function DoctorRecord23Panel01({ facilityId, title = 'DoctorRecord23 Workspace', onSelect }: DoctorRecord23Panel01Props) {
  const [items, setItems] = useState<DoctorRecord23[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listDoctorRecord23(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareDoctorRecord23ByPriority));
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
    if (!isDoctorRecord23Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveDoctorRecord23(id);
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
              <span className="lis-panel__label">{formatDoctorRecord23Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} doctors records (slice 23-01)
      </footer>
    </section>
  );
}

export default DoctorRecord23Panel01;
