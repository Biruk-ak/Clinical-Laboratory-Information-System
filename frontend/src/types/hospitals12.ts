/** Domain types for hospitals / HospitalRecord12 */
export type HospitalRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord12Status;
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

export interface HospitalRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord12ListResponse {
  items: HospitalRecord12[];
  total?: number;
}

export interface HospitalRecord12StatsResponse {
  activeCount: number;
}

export function isHospitalRecord12Active(rec: HospitalRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord12Label(rec: HospitalRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord12ByPriority(a: HospitalRecord12, b: HospitalRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
