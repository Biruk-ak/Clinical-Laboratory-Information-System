/** Domain types for reports / ReportRecord14 */
export type ReportRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord14Status;
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

export interface ReportRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord14ListResponse {
  items: ReportRecord14[];
  total?: number;
}

export interface ReportRecord14StatsResponse {
  activeCount: number;
}

export function isReportRecord14Active(rec: ReportRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord14Label(rec: ReportRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord14ByPriority(a: ReportRecord14, b: ReportRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
