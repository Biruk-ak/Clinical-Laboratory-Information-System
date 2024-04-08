/** Domain types for hospitals / HospitalRecord07 */
export type HospitalRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord07Status;
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

export interface HospitalRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord07ListResponse {
  items: HospitalRecord07[];
  total?: number;
}

export interface HospitalRecord07StatsResponse {
  activeCount: number;
}

export function isHospitalRecord07Active(rec: HospitalRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord07Label(rec: HospitalRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord07ByPriority(a: HospitalRecord07, b: HospitalRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
