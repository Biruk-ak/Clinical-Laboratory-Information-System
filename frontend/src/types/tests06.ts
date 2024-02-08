/** Domain types for tests / LabTestRecord06 */
export type LabTestRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord06Status;
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

export interface LabTestRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord06ListResponse {
  items: LabTestRecord06[];
  total?: number;
}

export interface LabTestRecord06StatsResponse {
  activeCount: number;
}

export function isLabTestRecord06Active(rec: LabTestRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord06Label(rec: LabTestRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord06ByPriority(a: LabTestRecord06, b: LabTestRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
