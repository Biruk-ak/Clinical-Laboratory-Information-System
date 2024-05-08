/** Domain types for reports / ReportRecord03 */
export type ReportRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord03Status;
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

export interface ReportRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord03ListResponse {
  items: ReportRecord03[];
  total?: number;
}

export interface ReportRecord03StatsResponse {
  activeCount: number;
}

export function isReportRecord03Active(rec: ReportRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord03Label(rec: ReportRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord03ByPriority(a: ReportRecord03, b: ReportRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
