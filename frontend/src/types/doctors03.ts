/** Domain types for doctors / DoctorRecord03 */
export type DoctorRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord03Status;
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

export interface DoctorRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord03ListResponse {
  items: DoctorRecord03[];
  total?: number;
}

export interface DoctorRecord03StatsResponse {
  activeCount: number;
}

export function isDoctorRecord03Active(rec: DoctorRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord03Label(rec: DoctorRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord03ByPriority(a: DoctorRecord03, b: DoctorRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
