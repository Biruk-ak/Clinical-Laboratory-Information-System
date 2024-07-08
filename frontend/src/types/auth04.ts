/** Domain types for auth / AuthRecord04 */
export type AuthRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord04Status;
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

export interface AuthRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord04ListResponse {
  items: AuthRecord04[];
  total?: number;
}

export interface AuthRecord04StatsResponse {
  activeCount: number;
}

export function isAuthRecord04Active(rec: AuthRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord04Label(rec: AuthRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord04ByPriority(a: AuthRecord04, b: AuthRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
