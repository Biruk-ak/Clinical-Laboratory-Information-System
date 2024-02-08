/** Domain types for tests / LabTestRecord14 */
export type LabTestRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord14Status;
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

export interface LabTestRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord14ListResponse {
  items: LabTestRecord14[];
  total?: number;
}

export interface LabTestRecord14StatsResponse {
  activeCount: number;
}

export function isLabTestRecord14Active(rec: LabTestRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord14Label(rec: LabTestRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord14ByPriority(a: LabTestRecord14, b: LabTestRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
