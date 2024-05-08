/** Domain types for reports / ReportRecord27 */
export type ReportRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord27Status;
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

export interface ReportRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord27ListResponse {
  items: ReportRecord27[];
  total?: number;
}

export interface ReportRecord27StatsResponse {
  activeCount: number;
}

export function isReportRecord27Active(rec: ReportRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord27Label(rec: ReportRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord27ByPriority(a: ReportRecord27, b: ReportRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
