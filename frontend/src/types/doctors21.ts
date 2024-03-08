/** Domain types for doctors / DoctorRecord21 */
export type DoctorRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord21Status;
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

export interface DoctorRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord21ListResponse {
  items: DoctorRecord21[];
  total?: number;
}

export interface DoctorRecord21StatsResponse {
  activeCount: number;
}

export function isDoctorRecord21Active(rec: DoctorRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord21Label(rec: DoctorRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord21ByPriority(a: DoctorRecord21, b: DoctorRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
