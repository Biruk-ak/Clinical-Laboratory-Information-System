/** Domain types for analytics / AnalyticsRecord06 */
export type AnalyticsRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord06Status;
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

export interface AnalyticsRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord06ListResponse {
  items: AnalyticsRecord06[];
  total?: number;
}

export interface AnalyticsRecord06StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord06Active(rec: AnalyticsRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord06Label(rec: AnalyticsRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord06ByPriority(a: AnalyticsRecord06, b: AnalyticsRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
