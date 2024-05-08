/** Domain types for reports / ReportRecord28 */
export type ReportRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord28Status;
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

export interface ReportRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord28ListResponse {
  items: ReportRecord28[];
  total?: number;
}

export interface ReportRecord28StatsResponse {
  activeCount: number;
}

export function isReportRecord28Active(rec: ReportRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord28Label(rec: ReportRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord28ByPriority(a: ReportRecord28, b: ReportRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
