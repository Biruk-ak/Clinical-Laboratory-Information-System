/** Domain types for reports / ReportRecord19 */
export type ReportRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord19Status;
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

export interface ReportRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord19ListResponse {
  items: ReportRecord19[];
  total?: number;
}

export interface ReportRecord19StatsResponse {
  activeCount: number;
}

export function isReportRecord19Active(rec: ReportRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord19Label(rec: ReportRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord19ByPriority(a: ReportRecord19, b: ReportRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
