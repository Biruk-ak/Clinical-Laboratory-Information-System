/** Domain types for analytics / AnalyticsRecord24 */
export type AnalyticsRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord24Status;
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

export interface AnalyticsRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord24ListResponse {
  items: AnalyticsRecord24[];
  total?: number;
}

export interface AnalyticsRecord24StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord24Active(rec: AnalyticsRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord24Label(rec: AnalyticsRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord24ByPriority(a: AnalyticsRecord24, b: AnalyticsRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
