/** Domain types for results / ResultRecord25 */
export type ResultRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord25Status;
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

export interface ResultRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord25ListResponse {
  items: ResultRecord25[];
  total?: number;
}

export interface ResultRecord25StatsResponse {
  activeCount: number;
}

export function isResultRecord25Active(rec: ResultRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord25Label(rec: ResultRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord25ByPriority(a: ResultRecord25, b: ResultRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
