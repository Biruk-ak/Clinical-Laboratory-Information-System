/** Domain types for tests / LabTestRecord04 */
export type LabTestRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface LabTestRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: LabTestRecord04Status;
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

export interface LabTestRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: LabTestRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface LabTestRecord04ListResponse {
  items: LabTestRecord04[];
  total?: number;
}

export interface LabTestRecord04StatsResponse {
  activeCount: number;
}

export function isLabTestRecord04Active(rec: LabTestRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatLabTestRecord04Label(rec: LabTestRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareLabTestRecord04ByPriority(a: LabTestRecord04, b: LabTestRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
