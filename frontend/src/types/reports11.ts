/** Domain types for reports / ReportRecord11 */
export type ReportRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord11Status;
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

export interface ReportRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord11ListResponse {
  items: ReportRecord11[];
  total?: number;
}

export interface ReportRecord11StatsResponse {
  activeCount: number;
}

export function isReportRecord11Active(rec: ReportRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord11Label(rec: ReportRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord11ByPriority(a: ReportRecord11, b: ReportRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
