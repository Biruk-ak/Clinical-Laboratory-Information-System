/** Domain types for doctors / DoctorRecord27 */
export type DoctorRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord27Status;
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

export interface DoctorRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord27ListResponse {
  items: DoctorRecord27[];
  total?: number;
}

export interface DoctorRecord27StatsResponse {
  activeCount: number;
}

export function isDoctorRecord27Active(rec: DoctorRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord27Label(rec: DoctorRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord27ByPriority(a: DoctorRecord27, b: DoctorRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
