/** Domain types for analytics / AnalyticsRecord16 */
export type AnalyticsRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord16Status;
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

export interface AnalyticsRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord16ListResponse {
  items: AnalyticsRecord16[];
  total?: number;
}

export interface AnalyticsRecord16StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord16Active(rec: AnalyticsRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord16Label(rec: AnalyticsRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord16ByPriority(a: AnalyticsRecord16, b: AnalyticsRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
