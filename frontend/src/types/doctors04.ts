/** Domain types for doctors / DoctorRecord04 */
export type DoctorRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface DoctorRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: DoctorRecord04Status;
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

export interface DoctorRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: DoctorRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface DoctorRecord04ListResponse {
  items: DoctorRecord04[];
  total?: number;
}

export interface DoctorRecord04StatsResponse {
  activeCount: number;
}

export function isDoctorRecord04Active(rec: DoctorRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatDoctorRecord04Label(rec: DoctorRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareDoctorRecord04ByPriority(a: DoctorRecord04, b: DoctorRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
