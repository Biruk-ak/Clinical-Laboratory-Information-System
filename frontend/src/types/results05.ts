/** Domain types for results / ResultRecord05 */
export type ResultRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord05Status;
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

export interface ResultRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord05ListResponse {
  items: ResultRecord05[];
  total?: number;
}

export interface ResultRecord05StatsResponse {
  activeCount: number;
}

export function isResultRecord05Active(rec: ResultRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord05Label(rec: ResultRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord05ByPriority(a: ResultRecord05, b: ResultRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
