/** Domain types for hospitals / HospitalRecord13 */
export type HospitalRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord13Status;
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

export interface HospitalRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord13ListResponse {
  items: HospitalRecord13[];
  total?: number;
}

export interface HospitalRecord13StatsResponse {
  activeCount: number;
}

export function isHospitalRecord13Active(rec: HospitalRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord13Label(rec: HospitalRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord13ByPriority(a: HospitalRecord13, b: HospitalRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
