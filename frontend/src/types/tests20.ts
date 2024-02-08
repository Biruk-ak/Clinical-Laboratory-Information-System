/** Domain types for tests / LabTestRecord20 */
export type LabTestRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord20Status;
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

export interface LabTestRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord20ListResponse {
  items: LabTestRecord20[];
  total?: number;
}

export interface LabTestRecord20StatsResponse {
  activeCount: number;
}

export function isLabTestRecord20Active(rec: LabTestRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord20Label(rec: LabTestRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord20ByPriority(a: LabTestRecord20, b: LabTestRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
