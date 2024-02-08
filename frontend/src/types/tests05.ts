/** Domain types for tests / LabTestRecord05 */
export type LabTestRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord05Status;
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

export interface LabTestRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord05ListResponse {
  items: LabTestRecord05[];
  total?: number;
}

export interface LabTestRecord05StatsResponse {
  activeCount: number;
}

export function isLabTestRecord05Active(rec: LabTestRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord05Label(rec: LabTestRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord05ByPriority(a: LabTestRecord05, b: LabTestRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
