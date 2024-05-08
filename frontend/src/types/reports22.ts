/** Domain types for reports / ReportRecord22 */
export type ReportRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord22Status;
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

export interface ReportRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord22ListResponse {
  items: ReportRecord22[];
  total?: number;
}

export interface ReportRecord22StatsResponse {
  activeCount: number;
}

export function isReportRecord22Active(rec: ReportRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord22Label(rec: ReportRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord22ByPriority(a: ReportRecord22, b: ReportRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
