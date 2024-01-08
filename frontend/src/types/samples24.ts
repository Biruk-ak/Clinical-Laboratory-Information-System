/** Domain types for samples / SampleRecord24 */
export type SampleRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord24Status;
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

export interface SampleRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord24ListResponse {
  items: SampleRecord24[];
  total?: number;
}

export interface SampleRecord24StatsResponse {
  activeCount: number;
}

export function isSampleRecord24Active(rec: SampleRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord24Label(rec: SampleRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord24ByPriority(a: SampleRecord24, b: SampleRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
