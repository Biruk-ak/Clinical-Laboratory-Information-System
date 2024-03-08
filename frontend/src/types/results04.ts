/** Domain types for results / ResultRecord04 */
export type ResultRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface ResultRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: ResultRecord04Status;
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

export interface ResultRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: ResultRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface ResultRecord04ListResponse {
  items: ResultRecord04[];
  total?: number;
}

export interface ResultRecord04StatsResponse {
  activeCount: number;
}

export function isResultRecord04Active(rec: ResultRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatResultRecord04Label(rec: ResultRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareResultRecord04ByPriority(a: ResultRecord04, b: ResultRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
