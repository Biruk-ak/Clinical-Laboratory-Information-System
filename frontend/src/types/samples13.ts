/** Domain types for samples / SampleRecord13 */
export type SampleRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord13Status;
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

export interface SampleRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord13ListResponse {
  items: SampleRecord13[];
  total?: number;
}

export interface SampleRecord13StatsResponse {
  activeCount: number;
}

export function isSampleRecord13Active(rec: SampleRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord13Label(rec: SampleRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord13ByPriority(a: SampleRecord13, b: SampleRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
