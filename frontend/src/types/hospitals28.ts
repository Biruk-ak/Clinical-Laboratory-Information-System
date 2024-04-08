/** Domain types for hospitals / HospitalRecord28 */
export type HospitalRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord28Status;
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

export interface HospitalRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord28ListResponse {
  items: HospitalRecord28[];
  total?: number;
}

export interface HospitalRecord28StatsResponse {
  activeCount: number;
}

export function isHospitalRecord28Active(rec: HospitalRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord28Label(rec: HospitalRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord28ByPriority(a: HospitalRecord28, b: HospitalRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
