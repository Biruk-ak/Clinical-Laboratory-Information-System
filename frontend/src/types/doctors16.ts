/** Domain types for doctors / DoctorRecord16 */
export type DoctorRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord16Status;
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

export interface DoctorRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord16ListResponse {
  items: DoctorRecord16[];
  total?: number;
}

export interface DoctorRecord16StatsResponse {
  activeCount: number;
}

export function isDoctorRecord16Active(rec: DoctorRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord16Label(rec: DoctorRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord16ByPriority(a: DoctorRecord16, b: DoctorRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
