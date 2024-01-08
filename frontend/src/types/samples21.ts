/** Domain types for samples / SampleRecord21 */
export type SampleRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord21Status;
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

export interface SampleRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord21ListResponse {
  items: SampleRecord21[];
  total?: number;
}

export interface SampleRecord21StatsResponse {
  activeCount: number;
}

export function isSampleRecord21Active(rec: SampleRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord21Label(rec: SampleRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord21ByPriority(a: SampleRecord21, b: SampleRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
