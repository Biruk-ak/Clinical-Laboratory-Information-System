/** Domain types for results / ResultRecord20 */
export type ResultRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord20Status;
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

export interface ResultRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord20ListResponse {
  items: ResultRecord20[];
  total?: number;
}

export interface ResultRecord20StatsResponse {
  activeCount: number;
}

export function isResultRecord20Active(rec: ResultRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord20Label(rec: ResultRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord20ByPriority(a: ResultRecord20, b: ResultRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
