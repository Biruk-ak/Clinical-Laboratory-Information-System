/** Domain types for analytics / AnalyticsRecord15 */
export type AnalyticsRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord15Status;
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

export interface AnalyticsRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord15ListResponse {
  items: AnalyticsRecord15[];
  total?: number;
}

export interface AnalyticsRecord15StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord15Active(rec: AnalyticsRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord15Label(rec: AnalyticsRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord15ByPriority(a: AnalyticsRecord15, b: AnalyticsRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
