/** Domain types for tests / LabTestRecord13 */
export type LabTestRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord13Status;
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

export interface LabTestRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord13ListResponse {
  items: LabTestRecord13[];
  total?: number;
}

export interface LabTestRecord13StatsResponse {
  activeCount: number;
}

export function isLabTestRecord13Active(rec: LabTestRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord13Label(rec: LabTestRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord13ByPriority(a: LabTestRecord13, b: LabTestRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
