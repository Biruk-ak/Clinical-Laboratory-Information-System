/** Domain types for reports / ReportRecord16 */
export type ReportRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord16Status;
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

export interface ReportRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord16ListResponse {
  items: ReportRecord16[];
  total?: number;
}

export interface ReportRecord16StatsResponse {
  activeCount: number;
}

export function isReportRecord16Active(rec: ReportRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord16Label(rec: ReportRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord16ByPriority(a: ReportRecord16, b: ReportRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
