/** Domain types for hospitals / HospitalRecord11 */
export type HospitalRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord11Status;
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

export interface HospitalRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord11ListResponse {
  items: HospitalRecord11[];
  total?: number;
}

export interface HospitalRecord11StatsResponse {
  activeCount: number;
}

export function isHospitalRecord11Active(rec: HospitalRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord11Label(rec: HospitalRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord11ByPriority(a: HospitalRecord11, b: HospitalRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
