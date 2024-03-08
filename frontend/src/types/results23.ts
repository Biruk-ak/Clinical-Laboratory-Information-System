/** Domain types for results / ResultRecord23 */
export type ResultRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord23Status;
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

export interface ResultRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord23ListResponse {
  items: ResultRecord23[];
  total?: number;
}

export interface ResultRecord23StatsResponse {
  activeCount: number;
}

export function isResultRecord23Active(rec: ResultRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord23Label(rec: ResultRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord23ByPriority(a: ResultRecord23, b: ResultRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
