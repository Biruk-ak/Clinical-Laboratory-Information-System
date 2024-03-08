/** Domain types for doctors / DoctorRecord28 */
export type DoctorRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord28Status;
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

export interface DoctorRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord28ListResponse {
  items: DoctorRecord28[];
  total?: number;
}

export interface DoctorRecord28StatsResponse {
  activeCount: number;
}

export function isDoctorRecord28Active(rec: DoctorRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord28Label(rec: DoctorRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord28ByPriority(a: DoctorRecord28, b: DoctorRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
