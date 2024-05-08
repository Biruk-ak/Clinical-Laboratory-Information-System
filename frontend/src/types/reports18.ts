/** Domain types for reports / ReportRecord18 */
export type ReportRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord18Status;
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

export interface ReportRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord18ListResponse {
  items: ReportRecord18[];
  total?: number;
}

export interface ReportRecord18StatsResponse {
  activeCount: number;
}

export function isReportRecord18Active(rec: ReportRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord18Label(rec: ReportRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord18ByPriority(a: ReportRecord18, b: ReportRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
