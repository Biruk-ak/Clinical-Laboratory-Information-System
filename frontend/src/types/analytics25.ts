/** Domain types for analytics / AnalyticsRecord25 */
export type AnalyticsRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord25Status;
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

export interface AnalyticsRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord25ListResponse {
  items: AnalyticsRecord25[];
  total?: number;
}

export interface AnalyticsRecord25StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord25Active(rec: AnalyticsRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord25Label(rec: AnalyticsRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord25ByPriority(a: AnalyticsRecord25, b: AnalyticsRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
