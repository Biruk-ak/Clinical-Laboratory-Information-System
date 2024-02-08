/** Domain types for tests / LabTestRecord15 */
export type LabTestRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord15Status;
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

export interface LabTestRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord15ListResponse {
  items: LabTestRecord15[];
  total?: number;
}

export interface LabTestRecord15StatsResponse {
  activeCount: number;
}

export function isLabTestRecord15Active(rec: LabTestRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord15Label(rec: LabTestRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord15ByPriority(a: LabTestRecord15, b: LabTestRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
