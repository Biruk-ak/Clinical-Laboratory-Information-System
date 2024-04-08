/** Domain types for hospitals / HospitalRecord21 */
export type HospitalRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord21Status;
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

export interface HospitalRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord21ListResponse {
  items: HospitalRecord21[];
  total?: number;
}

export interface HospitalRecord21StatsResponse {
  activeCount: number;
}

export function isHospitalRecord21Active(rec: HospitalRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord21Label(rec: HospitalRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord21ByPriority(a: HospitalRecord21, b: HospitalRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
