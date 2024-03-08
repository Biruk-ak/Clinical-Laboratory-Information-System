/** Domain types for results / ResultRecord22 */
export type ResultRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord22Status;
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

export interface ResultRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord22ListResponse {
  items: ResultRecord22[];
  total?: number;
}

export interface ResultRecord22StatsResponse {
  activeCount: number;
}

export function isResultRecord22Active(rec: ResultRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord22Label(rec: ResultRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord22ByPriority(a: ResultRecord22, b: ResultRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
