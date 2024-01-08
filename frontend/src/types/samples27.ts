/** Domain types for samples / SampleRecord27 */
export type SampleRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord27Status;
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

export interface SampleRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord27ListResponse {
  items: SampleRecord27[];
  total?: number;
}

export interface SampleRecord27StatsResponse {
  activeCount: number;
}

export function isSampleRecord27Active(rec: SampleRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord27Label(rec: SampleRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord27ByPriority(a: SampleRecord27, b: SampleRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
