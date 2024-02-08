/** Domain types for tests / LabTestRecord27 */
export type LabTestRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord27Status;
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

export interface LabTestRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord27ListResponse {
  items: LabTestRecord27[];
  total?: number;
}

export interface LabTestRecord27StatsResponse {
  activeCount: number;
}

export function isLabTestRecord27Active(rec: LabTestRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord27Label(rec: LabTestRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord27ByPriority(a: LabTestRecord27, b: LabTestRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
