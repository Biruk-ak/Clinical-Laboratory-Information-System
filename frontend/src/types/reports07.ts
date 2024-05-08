/** Domain types for reports / ReportRecord07 */
export type ReportRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord07Status;
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

export interface ReportRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord07ListResponse {
  items: ReportRecord07[];
  total?: number;
}

export interface ReportRecord07StatsResponse {
  activeCount: number;
}

export function isReportRecord07Active(rec: ReportRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord07Label(rec: ReportRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord07ByPriority(a: ReportRecord07, b: ReportRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
