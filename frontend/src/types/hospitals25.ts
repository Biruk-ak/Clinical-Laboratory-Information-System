/** Domain types for hospitals / HospitalRecord25 */
export type HospitalRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord25Status;
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

export interface HospitalRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord25ListResponse {
  items: HospitalRecord25[];
  total?: number;
}

export interface HospitalRecord25StatsResponse {
  activeCount: number;
}

export function isHospitalRecord25Active(rec: HospitalRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord25Label(rec: HospitalRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord25ByPriority(a: HospitalRecord25, b: HospitalRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
