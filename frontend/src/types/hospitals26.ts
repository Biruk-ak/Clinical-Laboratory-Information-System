/** Domain types for hospitals / HospitalRecord26 */
export type HospitalRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord26Status;
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

export interface HospitalRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord26ListResponse {
  items: HospitalRecord26[];
  total?: number;
}

export interface HospitalRecord26StatsResponse {
  activeCount: number;
}

export function isHospitalRecord26Active(rec: HospitalRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord26Label(rec: HospitalRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord26ByPriority(a: HospitalRecord26, b: HospitalRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
