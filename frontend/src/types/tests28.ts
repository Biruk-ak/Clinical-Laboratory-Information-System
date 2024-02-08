/** Domain types for tests / LabTestRecord28 */
export type LabTestRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord28Status;
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

export interface LabTestRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord28ListResponse {
  items: LabTestRecord28[];
  total?: number;
}

export interface LabTestRecord28StatsResponse {
  activeCount: number;
}

export function isLabTestRecord28Active(rec: LabTestRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord28Label(rec: LabTestRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord28ByPriority(a: LabTestRecord28, b: LabTestRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
