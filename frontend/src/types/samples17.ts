/** Domain types for samples / SampleRecord17 */
export type SampleRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord17Status;
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

export interface SampleRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord17ListResponse {
  items: SampleRecord17[];
  total?: number;
}

export interface SampleRecord17StatsResponse {
  activeCount: number;
}

export function isSampleRecord17Active(rec: SampleRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord17Label(rec: SampleRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord17ByPriority(a: SampleRecord17, b: SampleRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
