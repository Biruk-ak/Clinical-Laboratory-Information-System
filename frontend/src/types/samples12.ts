/** Domain types for samples / SampleRecord12 */
export type SampleRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord12Status;
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

export interface SampleRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord12ListResponse {
  items: SampleRecord12[];
  total?: number;
}

export interface SampleRecord12StatsResponse {
  activeCount: number;
}

export function isSampleRecord12Active(rec: SampleRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord12Label(rec: SampleRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord12ByPriority(a: SampleRecord12, b: SampleRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
