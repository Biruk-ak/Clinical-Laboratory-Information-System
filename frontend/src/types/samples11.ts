/** Domain types for samples / SampleRecord11 */
export type SampleRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord11Status;
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

export interface SampleRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord11ListResponse {
  items: SampleRecord11[];
  total?: number;
}

export interface SampleRecord11StatsResponse {
  activeCount: number;
}

export function isSampleRecord11Active(rec: SampleRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord11Label(rec: SampleRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord11ByPriority(a: SampleRecord11, b: SampleRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
