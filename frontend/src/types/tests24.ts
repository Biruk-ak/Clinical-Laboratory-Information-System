/** Domain types for tests / LabTestRecord24 */
export type LabTestRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord24Status;
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

export interface LabTestRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord24ListResponse {
  items: LabTestRecord24[];
  total?: number;
}

export interface LabTestRecord24StatsResponse {
  activeCount: number;
}

export function isLabTestRecord24Active(rec: LabTestRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord24Label(rec: LabTestRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord24ByPriority(a: LabTestRecord24, b: LabTestRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
