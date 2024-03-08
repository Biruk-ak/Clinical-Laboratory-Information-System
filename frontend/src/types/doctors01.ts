/** Domain types for doctors / DoctorRecord01 */
export type DoctorRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord01Status;
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

export interface DoctorRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord01ListResponse {
  items: DoctorRecord01[];
  total?: number;
}

export interface DoctorRecord01StatsResponse {
  activeCount: number;
}

export function isDoctorRecord01Active(rec: DoctorRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord01Label(rec: DoctorRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord01ByPriority(a: DoctorRecord01, b: DoctorRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
