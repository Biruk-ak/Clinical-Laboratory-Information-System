/** Domain types for results / ResultRecord28 */
export type ResultRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord28Status;
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

export interface ResultRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord28ListResponse {
  items: ResultRecord28[];
  total?: number;
}

export interface ResultRecord28StatsResponse {
  activeCount: number;
}

export function isResultRecord28Active(rec: ResultRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord28Label(rec: ResultRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord28ByPriority(a: ResultRecord28, b: ResultRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
