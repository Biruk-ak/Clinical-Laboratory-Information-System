/** Domain types for analytics / AnalyticsRecord01 */
export type AnalyticsRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord01Status;
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

export interface AnalyticsRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord01ListResponse {
  items: AnalyticsRecord01[];
  total?: number;
}

export interface AnalyticsRecord01StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord01Active(rec: AnalyticsRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord01Label(rec: AnalyticsRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord01ByPriority(a: AnalyticsRecord01, b: AnalyticsRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
