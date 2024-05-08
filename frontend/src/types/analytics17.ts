/** Domain types for analytics / AnalyticsRecord17 */
export type AnalyticsRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord17Status;
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

export interface AnalyticsRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord17ListResponse {
  items: AnalyticsRecord17[];
  total?: number;
}

export interface AnalyticsRecord17StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord17Active(rec: AnalyticsRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord17Label(rec: AnalyticsRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord17ByPriority(a: AnalyticsRecord17, b: AnalyticsRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
