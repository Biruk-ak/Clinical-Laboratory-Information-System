/** Domain types for reports / ReportRecord13 */
export type ReportRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord13Status;
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

export interface ReportRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord13ListResponse {
  items: ReportRecord13[];
  total?: number;
}

export interface ReportRecord13StatsResponse {
  activeCount: number;
}

export function isReportRecord13Active(rec: ReportRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord13Label(rec: ReportRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord13ByPriority(a: ReportRecord13, b: ReportRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
