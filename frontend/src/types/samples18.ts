/** Domain types for samples / SampleRecord18 */
export type SampleRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord18Status;
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

export interface SampleRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord18ListResponse {
  items: SampleRecord18[];
  total?: number;
}

export interface SampleRecord18StatsResponse {
  activeCount: number;
}

export function isSampleRecord18Active(rec: SampleRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord18Label(rec: SampleRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord18ByPriority(a: SampleRecord18, b: SampleRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
