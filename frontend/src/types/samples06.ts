/** Domain types for samples / SampleRecord06 */
export type SampleRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord06Status;
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

export interface SampleRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord06ListResponse {
  items: SampleRecord06[];
  total?: number;
}

export interface SampleRecord06StatsResponse {
  activeCount: number;
}

export function isSampleRecord06Active(rec: SampleRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord06Label(rec: SampleRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord06ByPriority(a: SampleRecord06, b: SampleRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
