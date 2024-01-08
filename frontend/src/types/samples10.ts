/** Domain types for samples / SampleRecord10 */
export type SampleRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord10Status;
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

export interface SampleRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord10ListResponse {
  items: SampleRecord10[];
  total?: number;
}

export interface SampleRecord10StatsResponse {
  activeCount: number;
}

export function isSampleRecord10Active(rec: SampleRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord10Label(rec: SampleRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord10ByPriority(a: SampleRecord10, b: SampleRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
