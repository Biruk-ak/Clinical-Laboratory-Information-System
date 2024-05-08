/** Domain types for reports / ReportRecord10 */
export type ReportRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord10Status;
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

export interface ReportRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord10ListResponse {
  items: ReportRecord10[];
  total?: number;
}

export interface ReportRecord10StatsResponse {
  activeCount: number;
}

export function isReportRecord10Active(rec: ReportRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord10Label(rec: ReportRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord10ByPriority(a: ReportRecord10, b: ReportRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
