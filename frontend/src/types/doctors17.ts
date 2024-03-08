/** Domain types for doctors / DoctorRecord17 */
export type DoctorRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord17Status;
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

export interface DoctorRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord17ListResponse {
  items: DoctorRecord17[];
  total?: number;
}

export interface DoctorRecord17StatsResponse {
  activeCount: number;
}

export function isDoctorRecord17Active(rec: DoctorRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord17Label(rec: DoctorRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord17ByPriority(a: DoctorRecord17, b: DoctorRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
