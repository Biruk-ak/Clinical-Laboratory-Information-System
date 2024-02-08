/** Domain types for tests / LabTestRecord02 */
export type LabTestRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord02Status;
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

export interface LabTestRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord02ListResponse {
  items: LabTestRecord02[];
  total?: number;
}

export interface LabTestRecord02StatsResponse {
  activeCount: number;
}

export function isLabTestRecord02Active(rec: LabTestRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord02Label(rec: LabTestRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord02ByPriority(a: LabTestRecord02, b: LabTestRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
