/** Domain types for tests / LabTestRecord16 */
export type LabTestRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord16Status;
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

export interface LabTestRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord16ListResponse {
  items: LabTestRecord16[];
  total?: number;
}

export interface LabTestRecord16StatsResponse {
  activeCount: number;
}

export function isLabTestRecord16Active(rec: LabTestRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord16Label(rec: LabTestRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord16ByPriority(a: LabTestRecord16, b: LabTestRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
