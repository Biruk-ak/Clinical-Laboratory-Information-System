/** Domain types for analytics / AnalyticsRecord20 */
export type AnalyticsRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord20Status;
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

export interface AnalyticsRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord20ListResponse {
  items: AnalyticsRecord20[];
  total?: number;
}

export interface AnalyticsRecord20StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord20Active(rec: AnalyticsRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord20Label(rec: AnalyticsRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord20ByPriority(a: AnalyticsRecord20, b: AnalyticsRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
