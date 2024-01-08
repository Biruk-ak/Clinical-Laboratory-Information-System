/** Domain types for samples / SampleRecord26 */
export type SampleRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord26Status;
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

export interface SampleRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord26ListResponse {
  items: SampleRecord26[];
  total?: number;
}

export interface SampleRecord26StatsResponse {
  activeCount: number;
}

export function isSampleRecord26Active(rec: SampleRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord26Label(rec: SampleRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord26ByPriority(a: SampleRecord26, b: SampleRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
