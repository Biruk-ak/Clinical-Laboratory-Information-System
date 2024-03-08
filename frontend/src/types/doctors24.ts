/** Domain types for doctors / DoctorRecord24 */
export type DoctorRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord24Status;
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

export interface DoctorRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord24ListResponse {
  items: DoctorRecord24[];
  total?: number;
}

export interface DoctorRecord24StatsResponse {
  activeCount: number;
}

export function isDoctorRecord24Active(rec: DoctorRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord24Label(rec: DoctorRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord24ByPriority(a: DoctorRecord24, b: DoctorRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
