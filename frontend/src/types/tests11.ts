/** Domain types for tests / LabTestRecord11 */
export type LabTestRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord11Status;
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

export interface LabTestRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord11ListResponse {
  items: LabTestRecord11[];
  total?: number;
}

export interface LabTestRecord11StatsResponse {
  activeCount: number;
}

export function isLabTestRecord11Active(rec: LabTestRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord11Label(rec: LabTestRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord11ByPriority(a: LabTestRecord11, b: LabTestRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
