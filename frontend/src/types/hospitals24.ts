/** Domain types for hospitals / HospitalRecord24 */
export type HospitalRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord24Status;
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

export interface HospitalRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord24ListResponse {
  items: HospitalRecord24[];
  total?: number;
}

export interface HospitalRecord24StatsResponse {
  activeCount: number;
}

export function isHospitalRecord24Active(rec: HospitalRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord24Label(rec: HospitalRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord24ByPriority(a: HospitalRecord24, b: HospitalRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
