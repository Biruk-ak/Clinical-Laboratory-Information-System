/** Domain types for analytics / AnalyticsRecord12 */
export type AnalyticsRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord12Status;
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

export interface AnalyticsRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord12ListResponse {
  items: AnalyticsRecord12[];
  total?: number;
}

export interface AnalyticsRecord12StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord12Active(rec: AnalyticsRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord12Label(rec: AnalyticsRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord12ByPriority(a: AnalyticsRecord12, b: AnalyticsRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
