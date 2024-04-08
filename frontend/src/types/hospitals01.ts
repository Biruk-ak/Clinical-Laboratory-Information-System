/** Domain types for hospitals / HospitalRecord01 */
export type HospitalRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord01Status;
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

export interface HospitalRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord01ListResponse {
  items: HospitalRecord01[];
  total?: number;
}

export interface HospitalRecord01StatsResponse {
  activeCount: number;
}

export function isHospitalRecord01Active(rec: HospitalRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord01Label(rec: HospitalRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord01ByPriority(a: HospitalRecord01, b: HospitalRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
