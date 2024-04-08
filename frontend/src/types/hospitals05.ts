/** Domain types for hospitals / HospitalRecord05 */
export type HospitalRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord05Status;
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

export interface HospitalRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord05ListResponse {
  items: HospitalRecord05[];
  total?: number;
}

export interface HospitalRecord05StatsResponse {
  activeCount: number;
}

export function isHospitalRecord05Active(rec: HospitalRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord05Label(rec: HospitalRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord05ByPriority(a: HospitalRecord05, b: HospitalRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
