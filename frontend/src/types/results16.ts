/** Domain types for results / ResultRecord16 */
export type ResultRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord16Status;
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

export interface ResultRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord16ListResponse {
  items: ResultRecord16[];
  total?: number;
}

export interface ResultRecord16StatsResponse {
  activeCount: number;
}

export function isResultRecord16Active(rec: ResultRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord16Label(rec: ResultRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord16ByPriority(a: ResultRecord16, b: ResultRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
