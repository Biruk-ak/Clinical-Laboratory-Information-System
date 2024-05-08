/** Domain types for analytics / AnalyticsRecord14 */
export type AnalyticsRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord14Status;
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

export interface AnalyticsRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord14ListResponse {
  items: AnalyticsRecord14[];
  total?: number;
}

export interface AnalyticsRecord14StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord14Active(rec: AnalyticsRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord14Label(rec: AnalyticsRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord14ByPriority(a: AnalyticsRecord14, b: AnalyticsRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
