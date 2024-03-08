/** Domain types for doctors / DoctorRecord02 */
export type DoctorRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord02Status;
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

export interface DoctorRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord02ListResponse {
  items: DoctorRecord02[];
  total?: number;
}

export interface DoctorRecord02StatsResponse {
  activeCount: number;
}

export function isDoctorRecord02Active(rec: DoctorRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord02Label(rec: DoctorRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord02ByPriority(a: DoctorRecord02, b: DoctorRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
