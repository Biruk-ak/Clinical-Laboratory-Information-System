/** Domain types for analytics / AnalyticsRecord09 */
export type AnalyticsRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord09Status;
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

export interface AnalyticsRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord09ListResponse {
  items: AnalyticsRecord09[];
  total?: number;
}

export interface AnalyticsRecord09StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord09Active(rec: AnalyticsRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord09Label(rec: AnalyticsRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord09ByPriority(a: AnalyticsRecord09, b: AnalyticsRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
