/** Domain types for results / ResultRecord01 */
export type ResultRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord01Status;
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

export interface ResultRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord01ListResponse {
  items: ResultRecord01[];
  total?: number;
}

export interface ResultRecord01StatsResponse {
  activeCount: number;
}

export function isResultRecord01Active(rec: ResultRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord01Label(rec: ResultRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord01ByPriority(a: ResultRecord01, b: ResultRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
