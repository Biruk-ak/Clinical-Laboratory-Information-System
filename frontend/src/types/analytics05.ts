/** Domain types for analytics / AnalyticsRecord05 */
export type AnalyticsRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord05Status;
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

export interface AnalyticsRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord05ListResponse {
  items: AnalyticsRecord05[];
  total?: number;
}

export interface AnalyticsRecord05StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord05Active(rec: AnalyticsRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord05Label(rec: AnalyticsRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord05ByPriority(a: AnalyticsRecord05, b: AnalyticsRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
