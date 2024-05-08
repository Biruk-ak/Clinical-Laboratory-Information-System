/** Domain types for analytics / AnalyticsRecord19 */
export type AnalyticsRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord19Status;
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

export interface AnalyticsRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord19ListResponse {
  items: AnalyticsRecord19[];
  total?: number;
}

export interface AnalyticsRecord19StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord19Active(rec: AnalyticsRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord19Label(rec: AnalyticsRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord19ByPriority(a: AnalyticsRecord19, b: AnalyticsRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
