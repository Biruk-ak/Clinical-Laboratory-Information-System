/** Domain types for reports / ReportRecord15 */
export type ReportRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord15Status;
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

export interface ReportRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord15ListResponse {
  items: ReportRecord15[];
  total?: number;
}

export interface ReportRecord15StatsResponse {
  activeCount: number;
}

export function isReportRecord15Active(rec: ReportRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord15Label(rec: ReportRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord15ByPriority(a: ReportRecord15, b: ReportRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
