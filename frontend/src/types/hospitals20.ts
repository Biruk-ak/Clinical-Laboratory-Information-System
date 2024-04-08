/** Domain types for hospitals / HospitalRecord20 */
export type HospitalRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord20Status;
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

export interface HospitalRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord20ListResponse {
  items: HospitalRecord20[];
  total?: number;
}

export interface HospitalRecord20StatsResponse {
  activeCount: number;
}

export function isHospitalRecord20Active(rec: HospitalRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord20Label(rec: HospitalRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord20ByPriority(a: HospitalRecord20, b: HospitalRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
