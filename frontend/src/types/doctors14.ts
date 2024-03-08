/** Domain types for doctors / DoctorRecord14 */
export type DoctorRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord14Status;
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

export interface DoctorRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord14ListResponse {
  items: DoctorRecord14[];
  total?: number;
}

export interface DoctorRecord14StatsResponse {
  activeCount: number;
}

export function isDoctorRecord14Active(rec: DoctorRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord14Label(rec: DoctorRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord14ByPriority(a: DoctorRecord14, b: DoctorRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
