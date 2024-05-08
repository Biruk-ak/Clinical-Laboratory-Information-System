/** Domain types for reports / ReportRecord26 */
export type ReportRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord26Status;
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

export interface ReportRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord26ListResponse {
  items: ReportRecord26[];
  total?: number;
}

export interface ReportRecord26StatsResponse {
  activeCount: number;
}

export function isReportRecord26Active(rec: ReportRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord26Label(rec: ReportRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord26ByPriority(a: ReportRecord26, b: ReportRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
