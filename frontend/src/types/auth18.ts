/** Domain types for auth / AuthRecord18 */
export type AuthRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord18Status;
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

export interface AuthRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord18ListResponse {
  items: AuthRecord18[];
  total?: number;
}

export interface AuthRecord18StatsResponse {
  activeCount: number;
}

export function isAuthRecord18Active(rec: AuthRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord18Label(rec: AuthRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord18ByPriority(a: AuthRecord18, b: AuthRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
