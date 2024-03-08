/** Domain types for doctors / DoctorRecord22 */
export type DoctorRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord22Status;
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

export interface DoctorRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord22ListResponse {
  items: DoctorRecord22[];
  total?: number;
}

export interface DoctorRecord22StatsResponse {
  activeCount: number;
}

export function isDoctorRecord22Active(rec: DoctorRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord22Label(rec: DoctorRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord22ByPriority(a: DoctorRecord22, b: DoctorRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
