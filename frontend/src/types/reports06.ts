/** Domain types for reports / ReportRecord06 */
export type ReportRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord06Status;
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

export interface ReportRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord06ListResponse {
  items: ReportRecord06[];
  total?: number;
}

export interface ReportRecord06StatsResponse {
  activeCount: number;
}

export function isReportRecord06Active(rec: ReportRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord06Label(rec: ReportRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord06ByPriority(a: ReportRecord06, b: ReportRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
