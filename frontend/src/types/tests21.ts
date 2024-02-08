/** Domain types for tests / LabTestRecord21 */
export type LabTestRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord21Status;
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

export interface LabTestRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord21ListResponse {
  items: LabTestRecord21[];
  total?: number;
}

export interface LabTestRecord21StatsResponse {
  activeCount: number;
}

export function isLabTestRecord21Active(rec: LabTestRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord21Label(rec: LabTestRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord21ByPriority(a: LabTestRecord21, b: LabTestRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
