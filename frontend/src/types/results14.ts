/** Domain types for results / ResultRecord14 */
export type ResultRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord14Status;
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

export interface ResultRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord14ListResponse {
  items: ResultRecord14[];
  total?: number;
}

export interface ResultRecord14StatsResponse {
  activeCount: number;
}

export function isResultRecord14Active(rec: ResultRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord14Label(rec: ResultRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord14ByPriority(a: ResultRecord14, b: ResultRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
