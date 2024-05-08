/** Domain types for reports / ReportRecord17 */
export type ReportRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord17Status;
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

export interface ReportRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord17ListResponse {
  items: ReportRecord17[];
  total?: number;
}

export interface ReportRecord17StatsResponse {
  activeCount: number;
}

export function isReportRecord17Active(rec: ReportRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord17Label(rec: ReportRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord17ByPriority(a: ReportRecord17, b: ReportRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
