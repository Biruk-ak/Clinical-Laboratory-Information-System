/** Domain types for reports / ReportRecord08 */
export type ReportRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord08Status;
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

export interface ReportRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord08ListResponse {
  items: ReportRecord08[];
  total?: number;
}

export interface ReportRecord08StatsResponse {
  activeCount: number;
}

export function isReportRecord08Active(rec: ReportRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord08Label(rec: ReportRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord08ByPriority(a: ReportRecord08, b: ReportRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
