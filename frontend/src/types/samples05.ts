/** Domain types for samples / SampleRecord05 */
export type SampleRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord05Status;
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

export interface SampleRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord05ListResponse {
  items: SampleRecord05[];
  total?: number;
}

export interface SampleRecord05StatsResponse {
  activeCount: number;
}

export function isSampleRecord05Active(rec: SampleRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord05Label(rec: SampleRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord05ByPriority(a: SampleRecord05, b: SampleRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
