/** Domain types for results / ResultRecord06 */
export type ResultRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord06Status;
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

export interface ResultRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord06ListResponse {
  items: ResultRecord06[];
  total?: number;
}

export interface ResultRecord06StatsResponse {
  activeCount: number;
}

export function isResultRecord06Active(rec: ResultRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord06Label(rec: ResultRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord06ByPriority(a: ResultRecord06, b: ResultRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
