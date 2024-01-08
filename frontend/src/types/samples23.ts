/** Domain types for samples / SampleRecord23 */
export type SampleRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord23Status;
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

export interface SampleRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord23ListResponse {
  items: SampleRecord23[];
  total?: number;
}

export interface SampleRecord23StatsResponse {
  activeCount: number;
}

export function isSampleRecord23Active(rec: SampleRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord23Label(rec: SampleRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord23ByPriority(a: SampleRecord23, b: SampleRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
