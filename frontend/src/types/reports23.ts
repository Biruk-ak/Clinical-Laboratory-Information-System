/** Domain types for reports / ReportRecord23 */
export type ReportRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord23Status;
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

export interface ReportRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord23ListResponse {
  items: ReportRecord23[];
  total?: number;
}

export interface ReportRecord23StatsResponse {
  activeCount: number;
}

export function isReportRecord23Active(rec: ReportRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord23Label(rec: ReportRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord23ByPriority(a: ReportRecord23, b: ReportRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
