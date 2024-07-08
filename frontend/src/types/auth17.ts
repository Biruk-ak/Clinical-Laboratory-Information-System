/** Domain types for auth / AuthRecord17 */
export type AuthRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord17Status;
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

export interface AuthRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord17ListResponse {
  items: AuthRecord17[];
  total?: number;
}

export interface AuthRecord17StatsResponse {
  activeCount: number;
}

export function isAuthRecord17Active(rec: AuthRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord17Label(rec: AuthRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord17ByPriority(a: AuthRecord17, b: AuthRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
