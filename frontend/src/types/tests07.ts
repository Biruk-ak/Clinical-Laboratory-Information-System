/** Domain types for tests / LabTestRecord07 */
export type LabTestRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord07Status;
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

export interface LabTestRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord07ListResponse {
  items: LabTestRecord07[];
  total?: number;
}

export interface LabTestRecord07StatsResponse {
  activeCount: number;
}

export function isLabTestRecord07Active(rec: LabTestRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord07Label(rec: LabTestRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord07ByPriority(a: LabTestRecord07, b: LabTestRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
