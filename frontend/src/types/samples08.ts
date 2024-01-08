/** Domain types for samples / SampleRecord08 */
export type SampleRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord08Status;
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

export interface SampleRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord08ListResponse {
  items: SampleRecord08[];
  total?: number;
}

export interface SampleRecord08StatsResponse {
  activeCount: number;
}

export function isSampleRecord08Active(rec: SampleRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord08Label(rec: SampleRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord08ByPriority(a: SampleRecord08, b: SampleRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
