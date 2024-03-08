/** Domain types for results / ResultRecord15 */
export type ResultRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord15Status;
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

export interface ResultRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord15ListResponse {
  items: ResultRecord15[];
  total?: number;
}

export interface ResultRecord15StatsResponse {
  activeCount: number;
}

export function isResultRecord15Active(rec: ResultRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord15Label(rec: ResultRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord15ByPriority(a: ResultRecord15, b: ResultRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
