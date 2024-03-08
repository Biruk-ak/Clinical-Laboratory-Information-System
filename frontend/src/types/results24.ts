/** Domain types for results / ResultRecord24 */
export type ResultRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord24Status;
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

export interface ResultRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord24ListResponse {
  items: ResultRecord24[];
  total?: number;
}

export interface ResultRecord24StatsResponse {
  activeCount: number;
}

export function isResultRecord24Active(rec: ResultRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord24Label(rec: ResultRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord24ByPriority(a: ResultRecord24, b: ResultRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
