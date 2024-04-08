/** Domain types for hospitals / HospitalRecord10 */
export type HospitalRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord10Status;
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

export interface HospitalRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord10ListResponse {
  items: HospitalRecord10[];
  total?: number;
}

export interface HospitalRecord10StatsResponse {
  activeCount: number;
}

export function isHospitalRecord10Active(rec: HospitalRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord10Label(rec: HospitalRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord10ByPriority(a: HospitalRecord10, b: HospitalRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
