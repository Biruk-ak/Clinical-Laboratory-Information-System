/** Domain types for samples / SampleRecord19 */
export type SampleRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord19Status;
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

export interface SampleRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord19ListResponse {
  items: SampleRecord19[];
  total?: number;
}

export interface SampleRecord19StatsResponse {
  activeCount: number;
}

export function isSampleRecord19Active(rec: SampleRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord19Label(rec: SampleRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord19ByPriority(a: SampleRecord19, b: SampleRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
