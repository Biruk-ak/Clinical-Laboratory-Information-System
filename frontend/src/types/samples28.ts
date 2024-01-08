/** Domain types for samples / SampleRecord28 */
export type SampleRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord28Status;
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

export interface SampleRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord28ListResponse {
  items: SampleRecord28[];
  total?: number;
}

export interface SampleRecord28StatsResponse {
  activeCount: number;
}

export function isSampleRecord28Active(rec: SampleRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord28Label(rec: SampleRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord28ByPriority(a: SampleRecord28, b: SampleRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
