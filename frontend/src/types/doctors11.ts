/** Domain types for doctors / DoctorRecord11 */
export type DoctorRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord11Status;
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

export interface DoctorRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord11ListResponse {
  items: DoctorRecord11[];
  total?: number;
}

export interface DoctorRecord11StatsResponse {
  activeCount: number;
}

export function isDoctorRecord11Active(rec: DoctorRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord11Label(rec: DoctorRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord11ByPriority(a: DoctorRecord11, b: DoctorRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
