/** Domain types for results / ResultRecord21 */
export type ResultRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord21Status;
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

export interface ResultRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord21ListResponse {
  items: ResultRecord21[];
  total?: number;
}

export interface ResultRecord21StatsResponse {
  activeCount: number;
}

export function isResultRecord21Active(rec: ResultRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord21Label(rec: ResultRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord21ByPriority(a: ResultRecord21, b: ResultRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
