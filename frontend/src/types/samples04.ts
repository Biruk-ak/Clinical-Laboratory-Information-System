/** Domain types for samples / SampleRecord04 */
export type SampleRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord04Status;
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

export interface SampleRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord04ListResponse {
  items: SampleRecord04[];
  total?: number;
}

export interface SampleRecord04StatsResponse {
  activeCount: number;
}

export function isSampleRecord04Active(rec: SampleRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord04Label(rec: SampleRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord04ByPriority(a: SampleRecord04, b: SampleRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
