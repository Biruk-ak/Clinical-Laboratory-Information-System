/** Domain types for reports / ReportRecord02 */
export type ReportRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord02Status;
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

export interface ReportRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord02ListResponse {
  items: ReportRecord02[];
  total?: number;
}

export interface ReportRecord02StatsResponse {
  activeCount: number;
}

export function isReportRecord02Active(rec: ReportRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord02Label(rec: ReportRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord02ByPriority(a: ReportRecord02, b: ReportRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
