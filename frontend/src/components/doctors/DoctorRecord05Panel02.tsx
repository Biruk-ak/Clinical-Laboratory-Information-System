import { useEffect, useState, startTransition } from 'react';
import type { DoctorRecord05 } from '../../types/doctors05';
import { formatDoctorRecord05Label, isDoctorRecord05Active, compareDoctorRecord05ByPriority } from '../../types/doctors05';
import { listDoctorRecord05, archiveDoctorRecord05 } from '../../api/doctors05';

export interface DoctorRecord05Panel02Props {
  facilityId: string;
  title?: string;
  onSelect?: (item: DoctorRecord05) => void;
}

/**
 * DoctorRecord05Panel02 — operational panel for doctors domain slice 05/02.
 * Supports list, filter by active status, and soft-archive actions.
 */
export function DoctorRecord05Panel02({ facilityId, title = 'DoctorRecord05 Workspace', onSelect }: DoctorRecord05Panel02Props) {
  const [items, setItems] = useState<DoctorRecord05[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listDoctorRecord05(facilityId)
      .then((res) => {
        if (cancelled) return;
        startTransition(() => {
          setItems([...res.items].sort(compareDoctorRecord05ByPriority));
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
    if (!isDoctorRecord05Active(item) && query !== 'show-inactive') return false;
    if (!query || query === 'show-inactive') return true;
    const hay = `${item.externalCode} ${item.displayName} ${item.status}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  async function onArchive(id: string) {
    await archiveDoctorRecord05(id);
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
              <span className="lis-panel__label">{formatDoctorRecord05Label(item)}</span>
              <span className="lis-panel__meta">{item.status} · P{item.priority}</span>
            </button>
            <button type="button" className="lis-panel__archive" onClick={() => void onArchive(item.id)}>
              Archive
            </button>
          </li>
        ))}
      </ul>
      <footer className="lis-panel__footer">
        Showing {filtered.length} of {items.length} doctors records (slice 05-02)
      </footer>
    </section>
  );
}

export default DoctorRecord05Panel02;
