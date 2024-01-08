/** Domain types for samples / SampleRecord20 */
export type SampleRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord20Status;
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

export interface SampleRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord20ListResponse {
  items: SampleRecord20[];
  total?: number;
}

export interface SampleRecord20StatsResponse {
  activeCount: number;
}

export function isSampleRecord20Active(rec: SampleRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord20Label(rec: SampleRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord20ByPriority(a: SampleRecord20, b: SampleRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
