/** Domain types for results / ResultRecord10 */
export type ResultRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord10Status;
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

export interface ResultRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord10ListResponse {
  items: ResultRecord10[];
  total?: number;
}

export interface ResultRecord10StatsResponse {
  activeCount: number;
}

export function isResultRecord10Active(rec: ResultRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord10Label(rec: ResultRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord10ByPriority(a: ResultRecord10, b: ResultRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
