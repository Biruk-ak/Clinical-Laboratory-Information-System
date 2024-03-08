/** Domain types for results / ResultRecord12 */
export type ResultRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord12Status;
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

export interface ResultRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord12ListResponse {
  items: ResultRecord12[];
  total?: number;
}

export interface ResultRecord12StatsResponse {
  activeCount: number;
}

export function isResultRecord12Active(rec: ResultRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord12Label(rec: ResultRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord12ByPriority(a: ResultRecord12, b: ResultRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
