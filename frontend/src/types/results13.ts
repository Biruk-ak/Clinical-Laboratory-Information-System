/** Domain types for results / ResultRecord13 */
export type ResultRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord13Status;
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

export interface ResultRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord13ListResponse {
  items: ResultRecord13[];
  total?: number;
}

export interface ResultRecord13StatsResponse {
  activeCount: number;
}

export function isResultRecord13Active(rec: ResultRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord13Label(rec: ResultRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord13ByPriority(a: ResultRecord13, b: ResultRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
