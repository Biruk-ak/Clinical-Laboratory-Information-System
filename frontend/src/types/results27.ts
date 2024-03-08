/** Domain types for results / ResultRecord27 */
export type ResultRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord27Status;
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

export interface ResultRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord27ListResponse {
  items: ResultRecord27[];
  total?: number;
}

export interface ResultRecord27StatsResponse {
  activeCount: number;
}

export function isResultRecord27Active(rec: ResultRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord27Label(rec: ResultRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord27ByPriority(a: ResultRecord27, b: ResultRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
