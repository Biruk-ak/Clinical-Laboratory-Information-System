/** Domain types for analytics / AnalyticsRecord08 */
export type AnalyticsRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord08Status;
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

export interface AnalyticsRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord08ListResponse {
  items: AnalyticsRecord08[];
  total?: number;
}

export interface AnalyticsRecord08StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord08Active(rec: AnalyticsRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord08Label(rec: AnalyticsRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord08ByPriority(a: AnalyticsRecord08, b: AnalyticsRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
