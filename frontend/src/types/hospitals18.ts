/** Domain types for hospitals / HospitalRecord18 */
export type HospitalRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord18Status;
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

export interface HospitalRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord18ListResponse {
  items: HospitalRecord18[];
  total?: number;
}

export interface HospitalRecord18StatsResponse {
  activeCount: number;
}

export function isHospitalRecord18Active(rec: HospitalRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord18Label(rec: HospitalRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord18ByPriority(a: HospitalRecord18, b: HospitalRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
