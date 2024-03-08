/** Domain types for doctors / DoctorRecord13 */
export type DoctorRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord13Status;
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

export interface DoctorRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord13ListResponse {
  items: DoctorRecord13[];
  total?: number;
}

export interface DoctorRecord13StatsResponse {
  activeCount: number;
}

export function isDoctorRecord13Active(rec: DoctorRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord13Label(rec: DoctorRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord13ByPriority(a: DoctorRecord13, b: DoctorRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
