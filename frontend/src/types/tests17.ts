/** Domain types for tests / LabTestRecord17 */
export type LabTestRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord17Status;
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

export interface LabTestRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord17ListResponse {
  items: LabTestRecord17[];
  total?: number;
}

export interface LabTestRecord17StatsResponse {
  activeCount: number;
}

export function isLabTestRecord17Active(rec: LabTestRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord17Label(rec: LabTestRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord17ByPriority(a: LabTestRecord17, b: LabTestRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
