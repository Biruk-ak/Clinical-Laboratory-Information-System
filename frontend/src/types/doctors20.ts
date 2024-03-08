/** Domain types for doctors / DoctorRecord20 */
export type DoctorRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord20Status;
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

export interface DoctorRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord20ListResponse {
  items: DoctorRecord20[];
  total?: number;
}

export interface DoctorRecord20StatsResponse {
  activeCount: number;
}

export function isDoctorRecord20Active(rec: DoctorRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord20Label(rec: DoctorRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord20ByPriority(a: DoctorRecord20, b: DoctorRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
