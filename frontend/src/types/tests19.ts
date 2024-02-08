/** Domain types for tests / LabTestRecord19 */
export type LabTestRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord19Status;
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

export interface LabTestRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord19ListResponse {
  items: LabTestRecord19[];
  total?: number;
}

export interface LabTestRecord19StatsResponse {
  activeCount: number;
}

export function isLabTestRecord19Active(rec: LabTestRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord19Label(rec: LabTestRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord19ByPriority(a: LabTestRecord19, b: LabTestRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
