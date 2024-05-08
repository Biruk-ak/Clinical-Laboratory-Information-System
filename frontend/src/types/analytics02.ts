/** Domain types for analytics / AnalyticsRecord02 */
export type AnalyticsRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord02Status;
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

export interface AnalyticsRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord02ListResponse {
  items: AnalyticsRecord02[];
  total?: number;
}

export interface AnalyticsRecord02StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord02Active(rec: AnalyticsRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord02Label(rec: AnalyticsRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord02ByPriority(a: AnalyticsRecord02, b: AnalyticsRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
