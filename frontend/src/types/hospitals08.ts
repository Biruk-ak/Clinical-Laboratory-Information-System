/** Domain types for hospitals / HospitalRecord08 */
export type HospitalRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord08Status;
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

export interface HospitalRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord08ListResponse {
  items: HospitalRecord08[];
  total?: number;
}

export interface HospitalRecord08StatsResponse {
  activeCount: number;
}

export function isHospitalRecord08Active(rec: HospitalRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord08Label(rec: HospitalRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord08ByPriority(a: HospitalRecord08, b: HospitalRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
