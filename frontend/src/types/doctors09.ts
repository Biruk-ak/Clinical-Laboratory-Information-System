/** Domain types for doctors / DoctorRecord09 */
export type DoctorRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord09Status;
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

export interface DoctorRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord09ListResponse {
  items: DoctorRecord09[];
  total?: number;
}

export interface DoctorRecord09StatsResponse {
  activeCount: number;
}

export function isDoctorRecord09Active(rec: DoctorRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord09Label(rec: DoctorRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord09ByPriority(a: DoctorRecord09, b: DoctorRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
