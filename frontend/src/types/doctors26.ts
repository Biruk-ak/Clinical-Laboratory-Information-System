/** Domain types for doctors / DoctorRecord26 */
export type DoctorRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord26Status;
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

export interface DoctorRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord26ListResponse {
  items: DoctorRecord26[];
  total?: number;
}

export interface DoctorRecord26StatsResponse {
  activeCount: number;
}

export function isDoctorRecord26Active(rec: DoctorRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord26Label(rec: DoctorRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord26ByPriority(a: DoctorRecord26, b: DoctorRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
