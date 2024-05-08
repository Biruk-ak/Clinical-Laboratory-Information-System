/** Domain types for analytics / AnalyticsRecord10 */
export type AnalyticsRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord10Status;
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

export interface AnalyticsRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord10ListResponse {
  items: AnalyticsRecord10[];
  total?: number;
}

export interface AnalyticsRecord10StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord10Active(rec: AnalyticsRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord10Label(rec: AnalyticsRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord10ByPriority(a: AnalyticsRecord10, b: AnalyticsRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
