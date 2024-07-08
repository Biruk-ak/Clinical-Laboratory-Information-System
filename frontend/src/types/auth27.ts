/** Domain types for auth / AuthRecord27 */
export type AuthRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord27Status;
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

export interface AuthRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord27ListResponse {
  items: AuthRecord27[];
  total?: number;
}

export interface AuthRecord27StatsResponse {
  activeCount: number;
}

export function isAuthRecord27Active(rec: AuthRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord27Label(rec: AuthRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord27ByPriority(a: AuthRecord27, b: AuthRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
