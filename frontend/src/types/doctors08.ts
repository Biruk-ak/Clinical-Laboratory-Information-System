/** Domain types for doctors / DoctorRecord08 */
export type DoctorRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord08Status;
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

export interface DoctorRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord08ListResponse {
  items: DoctorRecord08[];
  total?: number;
}

export interface DoctorRecord08StatsResponse {
  activeCount: number;
}

export function isDoctorRecord08Active(rec: DoctorRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord08Label(rec: DoctorRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord08ByPriority(a: DoctorRecord08, b: DoctorRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
