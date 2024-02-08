/** Domain types for tests / LabTestRecord08 */
export type LabTestRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord08Status;
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

export interface LabTestRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord08ListResponse {
  items: LabTestRecord08[];
  total?: number;
}

export interface LabTestRecord08StatsResponse {
  activeCount: number;
}

export function isLabTestRecord08Active(rec: LabTestRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord08Label(rec: LabTestRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord08ByPriority(a: LabTestRecord08, b: LabTestRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
