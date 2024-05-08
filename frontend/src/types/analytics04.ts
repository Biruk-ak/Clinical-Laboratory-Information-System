/** Domain types for analytics / AnalyticsRecord04 */
export type AnalyticsRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AnalyticsRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord04Status;
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

export interface AnalyticsRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: AnalyticsRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AnalyticsRecord04ListResponse {
  items: AnalyticsRecord04[];
  total?: number;
}

export interface AnalyticsRecord04StatsResponse {
  activeCount: number;
}

export function isAnalyticsRecord04Active(rec: AnalyticsRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAnalyticsRecord04Label(rec: AnalyticsRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAnalyticsRecord04ByPriority(a: AnalyticsRecord04, b: AnalyticsRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
