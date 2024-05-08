/** Domain types for analytics / AnalyticsRecord28 */
export type AnalyticsRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord28Status;
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

export interface AnalyticsRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord28ListResponse {
  items: AnalyticsRecord28[];
  total?: number;
}

export interface AnalyticsRecord28StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord28Active(rec: AnalyticsRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord28Label(rec: AnalyticsRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord28ByPriority(a: AnalyticsRecord28, b: AnalyticsRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
