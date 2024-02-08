/** Domain types for tests / LabTestRecord25 */
export type LabTestRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord25Status;
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

export interface LabTestRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord25ListResponse {
  items: LabTestRecord25[];
  total?: number;
}

export interface LabTestRecord25StatsResponse {
  activeCount: number;
}

export function isLabTestRecord25Active(rec: LabTestRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord25Label(rec: LabTestRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord25ByPriority(a: LabTestRecord25, b: LabTestRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
