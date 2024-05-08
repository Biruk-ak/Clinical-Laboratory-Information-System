/** Domain types for reports / ReportRecord09 */
export type ReportRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord09Status;
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

export interface ReportRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord09ListResponse {
  items: ReportRecord09[];
  total?: number;
}

export interface ReportRecord09StatsResponse {
  activeCount: number;
}

export function isReportRecord09Active(rec: ReportRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord09Label(rec: ReportRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord09ByPriority(a: ReportRecord09, b: ReportRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
