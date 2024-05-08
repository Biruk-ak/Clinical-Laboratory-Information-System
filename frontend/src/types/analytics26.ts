/** Domain types for analytics / AnalyticsRecord26 */
export type AnalyticsRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord26Status;
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

export interface AnalyticsRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord26ListResponse {
  items: AnalyticsRecord26[];
  total?: number;
}

export interface AnalyticsRecord26StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord26Active(rec: AnalyticsRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord26Label(rec: AnalyticsRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord26ByPriority(a: AnalyticsRecord26, b: AnalyticsRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
