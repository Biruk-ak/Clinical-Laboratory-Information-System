/** Domain types for tests / LabTestRecord23 */
export type LabTestRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord23Status;
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

export interface LabTestRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord23ListResponse {
  items: LabTestRecord23[];
  total?: number;
}

export interface LabTestRecord23StatsResponse {
  activeCount: number;
}

export function isLabTestRecord23Active(rec: LabTestRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord23Label(rec: LabTestRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord23ByPriority(a: LabTestRecord23, b: LabTestRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
