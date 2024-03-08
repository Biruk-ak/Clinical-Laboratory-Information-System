/** Domain types for doctors / DoctorRecord06 */
export type DoctorRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord06Status;
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

export interface DoctorRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord06ListResponse {
  items: DoctorRecord06[];
  total?: number;
}

export interface DoctorRecord06StatsResponse {
  activeCount: number;
}

export function isDoctorRecord06Active(rec: DoctorRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord06Label(rec: DoctorRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord06ByPriority(a: DoctorRecord06, b: DoctorRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
