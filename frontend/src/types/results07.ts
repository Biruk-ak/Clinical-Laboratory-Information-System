/** Domain types for results / ResultRecord07 */
export type ResultRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord07Status;
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

export interface ResultRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord07ListResponse {
  items: ResultRecord07[];
  total?: number;
}

export interface ResultRecord07StatsResponse {
  activeCount: number;
}

export function isResultRecord07Active(rec: ResultRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord07Label(rec: ResultRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord07ByPriority(a: ResultRecord07, b: ResultRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
