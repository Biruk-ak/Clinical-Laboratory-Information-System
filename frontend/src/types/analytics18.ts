/** Domain types for analytics / AnalyticsRecord18 */
export type AnalyticsRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord18Status;
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

export interface AnalyticsRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord18ListResponse {
  items: AnalyticsRecord18[];
  total?: number;
}

export interface AnalyticsRecord18StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord18Active(rec: AnalyticsRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord18Label(rec: AnalyticsRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord18ByPriority(a: AnalyticsRecord18, b: AnalyticsRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
