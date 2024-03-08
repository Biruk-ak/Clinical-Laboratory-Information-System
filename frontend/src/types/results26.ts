/** Domain types for results / ResultRecord26 */
export type ResultRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord26Status;
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

export interface ResultRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord26ListResponse {
  items: ResultRecord26[];
  total?: number;
}

export interface ResultRecord26StatsResponse {
  activeCount: number;
}

export function isResultRecord26Active(rec: ResultRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord26Label(rec: ResultRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord26ByPriority(a: ResultRecord26, b: ResultRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
