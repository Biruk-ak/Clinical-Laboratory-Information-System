/** Domain types for tests / LabTestRecord12 */
export type LabTestRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord12Status;
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

export interface LabTestRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord12ListResponse {
  items: LabTestRecord12[];
  total?: number;
}

export interface LabTestRecord12StatsResponse {
  activeCount: number;
}

export function isLabTestRecord12Active(rec: LabTestRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord12Label(rec: LabTestRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord12ByPriority(a: LabTestRecord12, b: LabTestRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
