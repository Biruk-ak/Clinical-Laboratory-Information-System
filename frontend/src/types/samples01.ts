/** Domain types for samples / SampleRecord01 */
export type SampleRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord01Status;
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

export interface SampleRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord01ListResponse {
  items: SampleRecord01[];
  total?: number;
}

export interface SampleRecord01StatsResponse {
  activeCount: number;
}

export function isSampleRecord01Active(rec: SampleRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord01Label(rec: SampleRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord01ByPriority(a: SampleRecord01, b: SampleRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
