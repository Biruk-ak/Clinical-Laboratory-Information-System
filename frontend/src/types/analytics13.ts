/** Domain types for analytics / AnalyticsRecord13 */
export type AnalyticsRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord13Status;
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

export interface AnalyticsRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord13ListResponse {
  items: AnalyticsRecord13[];
  total?: number;
}

export interface AnalyticsRecord13StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord13Active(rec: AnalyticsRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord13Label(rec: AnalyticsRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord13ByPriority(a: AnalyticsRecord13, b: AnalyticsRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
