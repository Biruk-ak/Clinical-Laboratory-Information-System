/** Domain types for results / ResultRecord02 */
export type ResultRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord02Status;
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

export interface ResultRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord02ListResponse {
  items: ResultRecord02[];
  total?: number;
}

export interface ResultRecord02StatsResponse {
  activeCount: number;
}

export function isResultRecord02Active(rec: ResultRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord02Label(rec: ResultRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord02ByPriority(a: ResultRecord02, b: ResultRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
