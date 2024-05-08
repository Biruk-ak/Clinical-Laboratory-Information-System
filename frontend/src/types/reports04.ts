/** Domain types for reports / ReportRecord04 */
export type ReportRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ReportRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ReportRecord04Status;
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

export interface ReportRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: ReportRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ReportRecord04ListResponse {
  items: ReportRecord04[];
  total?: number;
}

export interface ReportRecord04StatsResponse {
  activeCount: number;
}

export function isReportRecord04Active(rec: ReportRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatReportRecord04Label(rec: ReportRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareReportRecord04ByPriority(a: ReportRecord04, b: ReportRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
