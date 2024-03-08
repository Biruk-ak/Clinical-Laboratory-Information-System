/** Domain types for results / ResultRecord11 */
export type ResultRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord11Status;
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

export interface ResultRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord11ListResponse {
  items: ResultRecord11[];
  total?: number;
}

export interface ResultRecord11StatsResponse {
  activeCount: number;
}

export function isResultRecord11Active(rec: ResultRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord11Label(rec: ResultRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord11ByPriority(a: ResultRecord11, b: ResultRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
