/** Domain types for hospitals / HospitalRecord17 */
export type HospitalRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord17Status;
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

export interface HospitalRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord17ListResponse {
  items: HospitalRecord17[];
  total?: number;
}

export interface HospitalRecord17StatsResponse {
  activeCount: number;
}

export function isHospitalRecord17Active(rec: HospitalRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord17Label(rec: HospitalRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord17ByPriority(a: HospitalRecord17, b: HospitalRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
