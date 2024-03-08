/** Domain types for doctors / DoctorRecord07 */
export type DoctorRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord07Status;
  priority: number;
  facilityId: string;
  createdBy: string;
  updatedBy: string;
  notes: string;
  metadataJson: string;
  version: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
}

export interface DoctorRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord07ListResponse {
  items: DoctorRecord07[];
  total?: number;
}

export interface DoctorRecord07StatsResponse {
  activeCount: number;
}

export function isDoctorRecord07Active(rec: DoctorRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord07Label(rec: DoctorRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord07ByPriority(a: DoctorRecord07, b: DoctorRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
