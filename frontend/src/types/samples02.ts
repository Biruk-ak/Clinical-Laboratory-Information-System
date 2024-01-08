/** Domain types for samples / SampleRecord02 */
export type SampleRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord02Status;
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

export interface SampleRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord02ListResponse {
  items: SampleRecord02[];
  total?: number;
}

export interface SampleRecord02StatsResponse {
  activeCount: number;
}

export function isSampleRecord02Active(rec: SampleRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord02Label(rec: SampleRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord02ByPriority(a: SampleRecord02, b: SampleRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
