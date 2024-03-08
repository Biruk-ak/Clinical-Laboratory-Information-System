/** Domain types for results / ResultRecord17 */
export type ResultRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord17Status;
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

export interface ResultRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord17ListResponse {
  items: ResultRecord17[];
  total?: number;
}

export interface ResultRecord17StatsResponse {
  activeCount: number;
}

export function isResultRecord17Active(rec: ResultRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord17Label(rec: ResultRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord17ByPriority(a: ResultRecord17, b: ResultRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
