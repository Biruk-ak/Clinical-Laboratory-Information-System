/** Domain types for tests / LabTestRecord09 */
export type LabTestRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord09Status;
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

export interface LabTestRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord09ListResponse {
  items: LabTestRecord09[];
  total?: number;
}

export interface LabTestRecord09StatsResponse {
  activeCount: number;
}

export function isLabTestRecord09Active(rec: LabTestRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord09Label(rec: LabTestRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord09ByPriority(a: LabTestRecord09, b: LabTestRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
