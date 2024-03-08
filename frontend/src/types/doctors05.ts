/** Domain types for doctors / DoctorRecord05 */
export type DoctorRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord05Status;
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

export interface DoctorRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord05ListResponse {
  items: DoctorRecord05[];
  total?: number;
}

export interface DoctorRecord05StatsResponse {
  activeCount: number;
}

export function isDoctorRecord05Active(rec: DoctorRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord05Label(rec: DoctorRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord05ByPriority(a: DoctorRecord05, b: DoctorRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
