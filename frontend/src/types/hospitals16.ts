/** Domain types for hospitals / HospitalRecord16 */
export type HospitalRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord16Status;
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

export interface HospitalRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord16ListResponse {
  items: HospitalRecord16[];
  total?: number;
}

export interface HospitalRecord16StatsResponse {
  activeCount: number;
}

export function isHospitalRecord16Active(rec: HospitalRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord16Label(rec: HospitalRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord16ByPriority(a: HospitalRecord16, b: HospitalRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
