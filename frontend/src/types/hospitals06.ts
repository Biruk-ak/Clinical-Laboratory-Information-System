/** Domain types for hospitals / HospitalRecord06 */
export type HospitalRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord06Status;
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

export interface HospitalRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord06ListResponse {
  items: HospitalRecord06[];
  total?: number;
}

export interface HospitalRecord06StatsResponse {
  activeCount: number;
}

export function isHospitalRecord06Active(rec: HospitalRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord06Label(rec: HospitalRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord06ByPriority(a: HospitalRecord06, b: HospitalRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
