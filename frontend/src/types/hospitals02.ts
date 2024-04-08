/** Domain types for hospitals / HospitalRecord02 */
export type HospitalRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord02Status;
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

export interface HospitalRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord02ListResponse {
  items: HospitalRecord02[];
  total?: number;
}

export interface HospitalRecord02StatsResponse {
  activeCount: number;
}

export function isHospitalRecord02Active(rec: HospitalRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord02Label(rec: HospitalRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord02ByPriority(a: HospitalRecord02, b: HospitalRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
