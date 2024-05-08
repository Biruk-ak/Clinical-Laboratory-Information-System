/** Domain types for analytics / AnalyticsRecord23 */
export type AnalyticsRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord23Status;
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

export interface AnalyticsRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord23ListResponse {
  items: AnalyticsRecord23[];
  total?: number;
}

export interface AnalyticsRecord23StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord23Active(rec: AnalyticsRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord23Label(rec: AnalyticsRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord23ByPriority(a: AnalyticsRecord23, b: AnalyticsRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
