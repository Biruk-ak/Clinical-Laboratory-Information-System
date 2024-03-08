/** Domain types for results / ResultRecord08 */
export type ResultRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord08Status;
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

export interface ResultRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord08ListResponse {
  items: ResultRecord08[];
  total?: number;
}

export interface ResultRecord08StatsResponse {
  activeCount: number;
}

export function isResultRecord08Active(rec: ResultRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord08Label(rec: ResultRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord08ByPriority(a: ResultRecord08, b: ResultRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
