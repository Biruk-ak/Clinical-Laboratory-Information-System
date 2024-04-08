/** Domain types for hospitals / HospitalRecord15 */
export type HospitalRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord15Status;
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

export interface HospitalRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord15ListResponse {
  items: HospitalRecord15[];
  total?: number;
}

export interface HospitalRecord15StatsResponse {
  activeCount: number;
}

export function isHospitalRecord15Active(rec: HospitalRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord15Label(rec: HospitalRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord15ByPriority(a: HospitalRecord15, b: HospitalRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
