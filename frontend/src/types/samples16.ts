/** Domain types for samples / SampleRecord16 */
export type SampleRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord16Status;
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

export interface SampleRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord16ListResponse {
  items: SampleRecord16[];
  total?: number;
}

export interface SampleRecord16StatsResponse {
  activeCount: number;
}

export function isSampleRecord16Active(rec: SampleRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord16Label(rec: SampleRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord16ByPriority(a: SampleRecord16, b: SampleRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
