/** Domain types for tests / LabTestRecord01 */
export type LabTestRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord01Status;
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

export interface LabTestRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord01ListResponse {
  items: LabTestRecord01[];
  total?: number;
}

export interface LabTestRecord01StatsResponse {
  activeCount: number;
}

export function isLabTestRecord01Active(rec: LabTestRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord01Label(rec: LabTestRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord01ByPriority(a: LabTestRecord01, b: LabTestRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
