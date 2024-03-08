/** Domain types for results / ResultRecord19 */
export type ResultRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord19Status;
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

export interface ResultRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord19ListResponse {
  items: ResultRecord19[];
  total?: number;
}

export interface ResultRecord19StatsResponse {
  activeCount: number;
}

export function isResultRecord19Active(rec: ResultRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord19Label(rec: ResultRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord19ByPriority(a: ResultRecord19, b: ResultRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
