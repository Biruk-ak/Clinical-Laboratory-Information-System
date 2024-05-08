/** Domain types for reports / ReportRecord24 */
export type ReportRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord24Status;
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

export interface ReportRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord24ListResponse {
  items: ReportRecord24[];
  total?: number;
}

export interface ReportRecord24StatsResponse {
  activeCount: number;
}

export function isReportRecord24Active(rec: ReportRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord24Label(rec: ReportRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord24ByPriority(a: ReportRecord24, b: ReportRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
