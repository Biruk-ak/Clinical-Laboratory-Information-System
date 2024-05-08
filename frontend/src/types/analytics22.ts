/** Domain types for analytics / AnalyticsRecord22 */
export type AnalyticsRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord22Status;
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

export interface AnalyticsRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord22ListResponse {
  items: AnalyticsRecord22[];
  total?: number;
}

export interface AnalyticsRecord22StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord22Active(rec: AnalyticsRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord22Label(rec: AnalyticsRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord22ByPriority(a: AnalyticsRecord22, b: AnalyticsRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
