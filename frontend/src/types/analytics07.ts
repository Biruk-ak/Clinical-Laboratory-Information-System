/** Domain types for analytics / AnalyticsRecord07 */
export type AnalyticsRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord07Status;
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

export interface AnalyticsRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord07ListResponse {
  items: AnalyticsRecord07[];
  total?: number;
}

export interface AnalyticsRecord07StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord07Active(rec: AnalyticsRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord07Label(rec: AnalyticsRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord07ByPriority(a: AnalyticsRecord07, b: AnalyticsRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
