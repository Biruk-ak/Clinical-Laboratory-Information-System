/** Domain types for samples / SampleRecord07 */
export type SampleRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord07Status;
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

export interface SampleRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord07ListResponse {
  items: SampleRecord07[];
  total?: number;
}

export interface SampleRecord07StatsResponse {
  activeCount: number;
}

export function isSampleRecord07Active(rec: SampleRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord07Label(rec: SampleRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord07ByPriority(a: SampleRecord07, b: SampleRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
