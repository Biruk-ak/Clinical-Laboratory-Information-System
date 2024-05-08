/** Domain types for reports / ReportRecord20 */
export type ReportRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord20Status;
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

export interface ReportRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord20ListResponse {
  items: ReportRecord20[];
  total?: number;
}

export interface ReportRecord20StatsResponse {
  activeCount: number;
}

export function isReportRecord20Active(rec: ReportRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord20Label(rec: ReportRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord20ByPriority(a: ReportRecord20, b: ReportRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
