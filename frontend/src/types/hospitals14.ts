/** Domain types for hospitals / HospitalRecord14 */
export type HospitalRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord14Status;
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

export interface HospitalRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord14ListResponse {
  items: HospitalRecord14[];
  total?: number;
}

export interface HospitalRecord14StatsResponse {
  activeCount: number;
}

export function isHospitalRecord14Active(rec: HospitalRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord14Label(rec: HospitalRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord14ByPriority(a: HospitalRecord14, b: HospitalRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
