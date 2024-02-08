/** Domain types for tests / LabTestRecord22 */
export type LabTestRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord22Status;
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

export interface LabTestRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord22ListResponse {
  items: LabTestRecord22[];
  total?: number;
}

export interface LabTestRecord22StatsResponse {
  activeCount: number;
}

export function isLabTestRecord22Active(rec: LabTestRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord22Label(rec: LabTestRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord22ByPriority(a: LabTestRecord22, b: LabTestRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
