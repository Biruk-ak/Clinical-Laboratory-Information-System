/** Domain types for results / ResultRecord18 */
export type ResultRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord18Status;
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

export interface ResultRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord18ListResponse {
  items: ResultRecord18[];
  total?: number;
}

export interface ResultRecord18StatsResponse {
  activeCount: number;
}

export function isResultRecord18Active(rec: ResultRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord18Label(rec: ResultRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord18ByPriority(a: ResultRecord18, b: ResultRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
