/** Domain types for samples / SampleRecord22 */
export type SampleRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord22Status;
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

export interface SampleRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord22ListResponse {
  items: SampleRecord22[];
  total?: number;
}

export interface SampleRecord22StatsResponse {
  activeCount: number;
}

export function isSampleRecord22Active(rec: SampleRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord22Label(rec: SampleRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord22ByPriority(a: SampleRecord22, b: SampleRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
