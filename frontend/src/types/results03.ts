/** Domain types for results / ResultRecord03 */
export type ResultRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord03Status;
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

export interface ResultRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord03ListResponse {
  items: ResultRecord03[];
  total?: number;
}

export interface ResultRecord03StatsResponse {
  activeCount: number;
}

export function isResultRecord03Active(rec: ResultRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord03Label(rec: ResultRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord03ByPriority(a: ResultRecord03, b: ResultRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
