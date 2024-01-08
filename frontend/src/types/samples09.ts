/** Domain types for samples / SampleRecord09 */
export type SampleRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord09Status;
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

export interface SampleRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord09ListResponse {
  items: SampleRecord09[];
  total?: number;
}

export interface SampleRecord09StatsResponse {
  activeCount: number;
}

export function isSampleRecord09Active(rec: SampleRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord09Label(rec: SampleRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord09ByPriority(a: SampleRecord09, b: SampleRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
