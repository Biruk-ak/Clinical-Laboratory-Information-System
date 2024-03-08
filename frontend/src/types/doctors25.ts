/** Domain types for doctors / DoctorRecord25 */
export type DoctorRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord25Status;
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

export interface DoctorRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord25ListResponse {
  items: DoctorRecord25[];
  total?: number;
}

export interface DoctorRecord25StatsResponse {
  activeCount: number;
}

export function isDoctorRecord25Active(rec: DoctorRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord25Label(rec: DoctorRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord25ByPriority(a: DoctorRecord25, b: DoctorRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
