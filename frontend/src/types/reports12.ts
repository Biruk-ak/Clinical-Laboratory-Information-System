/** Domain types for reports / ReportRecord12 */
export type ReportRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord12Status;
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

export interface ReportRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord12ListResponse {
  items: ReportRecord12[];
  total?: number;
}

export interface ReportRecord12StatsResponse {
  activeCount: number;
}

export function isReportRecord12Active(rec: ReportRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord12Label(rec: ReportRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord12ByPriority(a: ReportRecord12, b: ReportRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
