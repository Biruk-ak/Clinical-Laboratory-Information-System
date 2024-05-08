/** Domain types for analytics / AnalyticsRecord27 */
export type AnalyticsRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord27Status;
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

export interface AnalyticsRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord27ListResponse {
  items: AnalyticsRecord27[];
  total?: number;
}

export interface AnalyticsRecord27StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord27Active(rec: AnalyticsRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord27Label(rec: AnalyticsRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord27ByPriority(a: AnalyticsRecord27, b: AnalyticsRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
