/** Domain types for samples / SampleRecord15 */
export type SampleRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord15Status;
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

export interface SampleRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord15ListResponse {
  items: SampleRecord15[];
  total?: number;
}

export interface SampleRecord15StatsResponse {
  activeCount: number;
}

export function isSampleRecord15Active(rec: SampleRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord15Label(rec: SampleRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord15ByPriority(a: SampleRecord15, b: SampleRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
