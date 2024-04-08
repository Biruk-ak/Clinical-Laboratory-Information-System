/** Domain types for hospitals / HospitalRecord23 */
export type HospitalRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord23Status;
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

export interface HospitalRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord23ListResponse {
  items: HospitalRecord23[];
  total?: number;
}

export interface HospitalRecord23StatsResponse {
  activeCount: number;
}

export function isHospitalRecord23Active(rec: HospitalRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord23Label(rec: HospitalRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord23ByPriority(a: HospitalRecord23, b: HospitalRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
