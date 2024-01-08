/** Domain types for samples / SampleRecord25 */
export type SampleRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord25Status;
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

export interface SampleRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord25ListResponse {
  items: SampleRecord25[];
  total?: number;
}

export interface SampleRecord25StatsResponse {
  activeCount: number;
}

export function isSampleRecord25Active(rec: SampleRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord25Label(rec: SampleRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord25ByPriority(a: SampleRecord25, b: SampleRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
