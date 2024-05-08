/** Domain types for reports / ReportRecord21 */
export type ReportRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord21Status;
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

export interface ReportRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord21ListResponse {
  items: ReportRecord21[];
  total?: number;
}

export interface ReportRecord21StatsResponse {
  activeCount: number;
}

export function isReportRecord21Active(rec: ReportRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord21Label(rec: ReportRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord21ByPriority(a: ReportRecord21, b: ReportRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
