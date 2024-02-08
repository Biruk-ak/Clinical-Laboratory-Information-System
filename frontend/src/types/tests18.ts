/** Domain types for tests / LabTestRecord18 */
export type LabTestRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord18Status;
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

export interface LabTestRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord18ListResponse {
  items: LabTestRecord18[];
  total?: number;
}

export interface LabTestRecord18StatsResponse {
  activeCount: number;
}

export function isLabTestRecord18Active(rec: LabTestRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord18Label(rec: LabTestRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord18ByPriority(a: LabTestRecord18, b: LabTestRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
