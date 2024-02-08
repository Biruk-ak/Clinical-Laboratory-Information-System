/** Domain types for tests / LabTestRecord26 */
export type LabTestRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord26Status;
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

export interface LabTestRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord26ListResponse {
  items: LabTestRecord26[];
  total?: number;
}

export interface LabTestRecord26StatsResponse {
  activeCount: number;
}

export function isLabTestRecord26Active(rec: LabTestRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord26Label(rec: LabTestRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord26ByPriority(a: LabTestRecord26, b: LabTestRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
