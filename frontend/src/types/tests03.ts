/** Domain types for tests / LabTestRecord03 */
export type LabTestRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord03Status;
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

export interface LabTestRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord03ListResponse {
  items: LabTestRecord03[];
  total?: number;
}

export interface LabTestRecord03StatsResponse {
  activeCount: number;
}

export function isLabTestRecord03Active(rec: LabTestRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord03Label(rec: LabTestRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord03ByPriority(a: LabTestRecord03, b: LabTestRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
