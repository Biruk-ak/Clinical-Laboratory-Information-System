/** Domain types for analytics / AnalyticsRecord11 */
export type AnalyticsRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord11Status;
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

export interface AnalyticsRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord11ListResponse {
  items: AnalyticsRecord11[];
  total?: number;
}

export interface AnalyticsRecord11StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord11Active(rec: AnalyticsRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord11Label(rec: AnalyticsRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord11ByPriority(a: AnalyticsRecord11, b: AnalyticsRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
