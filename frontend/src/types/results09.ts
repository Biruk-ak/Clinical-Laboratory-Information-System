/** Domain types for results / ResultRecord09 */
export type ResultRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord09Status;
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

export interface ResultRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord09ListResponse {
  items: ResultRecord09[];
  total?: number;
}

export interface ResultRecord09StatsResponse {
  activeCount: number;
}

export function isResultRecord09Active(rec: ResultRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord09Label(rec: ResultRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord09ByPriority(a: ResultRecord09, b: ResultRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
