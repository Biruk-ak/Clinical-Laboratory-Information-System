/** Domain types for auth / AuthRecord07 */
export type AuthRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord07Status;
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

export interface AuthRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord07ListResponse {
  items: AuthRecord07[];
  total?: number;
}

export interface AuthRecord07StatsResponse {
  activeCount: number;
}

export function isAuthRecord07Active(rec: AuthRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord07Label(rec: AuthRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord07ByPriority(a: AuthRecord07, b: AuthRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
