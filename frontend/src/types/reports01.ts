/** Domain types for reports / ReportRecord01 */
export type ReportRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord01Status;
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

export interface ReportRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord01ListResponse {
  items: ReportRecord01[];
  total?: number;
}

export interface ReportRecord01StatsResponse {
  activeCount: number;
}

export function isReportRecord01Active(rec: ReportRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord01Label(rec: ReportRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord01ByPriority(a: ReportRecord01, b: ReportRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
