/** Domain types for hospitals / HospitalRecord22 */
export type HospitalRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord22Status;
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

export interface HospitalRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord22ListResponse {
  items: HospitalRecord22[];
  total?: number;
}

export interface HospitalRecord22StatsResponse {
  activeCount: number;
}

export function isHospitalRecord22Active(rec: HospitalRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord22Label(rec: HospitalRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord22ByPriority(a: HospitalRecord22, b: HospitalRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
