/** Domain types for hospitals / HospitalRecord27 */
export type HospitalRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord27Status;
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

export interface HospitalRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord27ListResponse {
  items: HospitalRecord27[];
  total?: number;
}

export interface HospitalRecord27StatsResponse {
  activeCount: number;
}

export function isHospitalRecord27Active(rec: HospitalRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord27Label(rec: HospitalRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord27ByPriority(a: HospitalRecord27, b: HospitalRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
