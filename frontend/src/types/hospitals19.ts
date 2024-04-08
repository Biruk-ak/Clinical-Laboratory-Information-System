/** Domain types for hospitals / HospitalRecord19 */
export type HospitalRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord19Status;
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

export interface HospitalRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord19ListResponse {
  items: HospitalRecord19[];
  total?: number;
}

export interface HospitalRecord19StatsResponse {
  activeCount: number;
}

export function isHospitalRecord19Active(rec: HospitalRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord19Label(rec: HospitalRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord19ByPriority(a: HospitalRecord19, b: HospitalRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
