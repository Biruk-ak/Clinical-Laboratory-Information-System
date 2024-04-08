/** Domain types for hospitals / HospitalRecord09 */
export type HospitalRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord09Status;
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

export interface HospitalRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord09ListResponse {
  items: HospitalRecord09[];
  total?: number;
}

export interface HospitalRecord09StatsResponse {
  activeCount: number;
}

export function isHospitalRecord09Active(rec: HospitalRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord09Label(rec: HospitalRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord09ByPriority(a: HospitalRecord09, b: HospitalRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
