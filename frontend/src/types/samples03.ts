/** Domain types for samples / SampleRecord03 */
export type SampleRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface SampleRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: SampleRecord03Status;
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

export interface SampleRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: SampleRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface SampleRecord03ListResponse {
  items: SampleRecord03[];
  total?: number;
}

export interface SampleRecord03StatsResponse {
  activeCount: number;
}

export function isSampleRecord03Active(rec: SampleRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatSampleRecord03Label(rec: SampleRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareSampleRecord03ByPriority(a: SampleRecord03, b: SampleRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
