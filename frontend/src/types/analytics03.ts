/** Domain types for analytics / AnalyticsRecord03 */
export type AnalyticsRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord03Status;
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

export interface AnalyticsRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord03ListResponse {
  items: AnalyticsRecord03[];
  total?: number;
}

export interface AnalyticsRecord03StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord03Active(rec: AnalyticsRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord03Label(rec: AnalyticsRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord03ByPriority(a: AnalyticsRecord03, b: AnalyticsRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
