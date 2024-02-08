/** Domain types for tests / LabTestRecord10 */
export type LabTestRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord10Status;
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

export interface LabTestRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord10ListResponse {
  items: LabTestRecord10[];
  total?: number;
}

export interface LabTestRecord10StatsResponse {
  activeCount: number;
}

export function isLabTestRecord10Active(rec: LabTestRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord10Label(rec: LabTestRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord10ByPriority(a: LabTestRecord10, b: LabTestRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
