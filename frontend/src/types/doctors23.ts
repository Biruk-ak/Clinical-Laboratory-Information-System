/** Domain types for doctors / DoctorRecord23 */
export type DoctorRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord23Status;
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

export interface DoctorRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord23ListResponse {
  items: DoctorRecord23[];
  total?: number;
}

export interface DoctorRecord23StatsResponse {
  activeCount: number;
}

export function isDoctorRecord23Active(rec: DoctorRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord23Label(rec: DoctorRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord23ByPriority(a: DoctorRecord23, b: DoctorRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
