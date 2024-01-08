/** Domain types for samples / SampleRecord14 */
export type SampleRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord14Status;
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

export interface SampleRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord14ListResponse {
  items: SampleRecord14[];
  total?: number;
}

export interface SampleRecord14StatsResponse {
  activeCount: number;
}

export function isSampleRecord14Active(rec: SampleRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord14Label(rec: SampleRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord14ByPriority(a: SampleRecord14, b: SampleRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
