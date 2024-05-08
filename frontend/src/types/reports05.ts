/** Domain types for reports / ReportRecord05 */
export type ReportRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord05Status;
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

export interface ReportRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord05ListResponse {
  items: ReportRecord05[];
  total?: number;
}

export interface ReportRecord05StatsResponse {
  activeCount: number;
}

export function isReportRecord05Active(rec: ReportRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord05Label(rec: ReportRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord05ByPriority(a: ReportRecord05, b: ReportRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
