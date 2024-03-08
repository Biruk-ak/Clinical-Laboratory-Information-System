/** Domain types for doctors / DoctorRecord18 */
export type DoctorRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord18Status;
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

export interface DoctorRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord18ListResponse {
  items: DoctorRecord18[];
  total?: number;
}

export interface DoctorRecord18StatsResponse {
  activeCount: number;
}

export function isDoctorRecord18Active(rec: DoctorRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord18Label(rec: DoctorRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord18ByPriority(a: DoctorRecord18, b: DoctorRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
