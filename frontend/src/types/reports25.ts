/** Domain types for reports / ReportRecord25 */
export type ReportRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord25Status;
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

export interface ReportRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord25ListResponse {
  items: ReportRecord25[];
  total?: number;
}

export interface ReportRecord25StatsResponse {
  activeCount: number;
}

export function isReportRecord25Active(rec: ReportRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord25Label(rec: ReportRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord25ByPriority(a: ReportRecord25, b: ReportRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
