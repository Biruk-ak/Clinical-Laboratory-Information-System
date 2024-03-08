/** Domain types for doctors / DoctorRecord12 */
export type DoctorRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord12Status;
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

export interface DoctorRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord12ListResponse {
  items: DoctorRecord12[];
  total?: number;
}

export interface DoctorRecord12StatsResponse {
  activeCount: number;
}

export function isDoctorRecord12Active(rec: DoctorRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord12Label(rec: DoctorRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord12ByPriority(a: DoctorRecord12, b: DoctorRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
