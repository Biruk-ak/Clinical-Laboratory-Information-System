/** Domain types for doctors / DoctorRecord10 */
export type DoctorRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord10Status;
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

export interface DoctorRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord10ListResponse {
  items: DoctorRecord10[];
  total?: number;
}

export interface DoctorRecord10StatsResponse {
  activeCount: number;
}

export function isDoctorRecord10Active(rec: DoctorRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord10Label(rec: DoctorRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord10ByPriority(a: DoctorRecord10, b: DoctorRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
