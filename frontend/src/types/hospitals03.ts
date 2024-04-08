/** Domain types for hospitals / HospitalRecord03 */
export type HospitalRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord03Status;
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

export interface HospitalRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord03ListResponse {
  items: HospitalRecord03[];
  total?: number;
}

export interface HospitalRecord03StatsResponse {
  activeCount: number;
}

export function isHospitalRecord03Active(rec: HospitalRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord03Label(rec: HospitalRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord03ByPriority(a: HospitalRecord03, b: HospitalRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
