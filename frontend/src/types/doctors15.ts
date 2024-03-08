/** Domain types for doctors / DoctorRecord15 */
export type DoctorRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord15Status;
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

export interface DoctorRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord15ListResponse {
  items: DoctorRecord15[];
  total?: number;
}

export interface DoctorRecord15StatsResponse {
  activeCount: number;
}

export function isDoctorRecord15Active(rec: DoctorRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord15Label(rec: DoctorRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord15ByPriority(a: DoctorRecord15, b: DoctorRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
