/** Domain types for auth / AuthRecord01 */
export type AuthRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord01Status;
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

export interface AuthRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord01ListResponse {
  items: AuthRecord01[];
  total?: number;
}

export interface AuthRecord01StatsResponse {
  activeCount: number;
}

export function isAuthRecord01Active(rec: AuthRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord01Label(rec: AuthRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord01ByPriority(a: AuthRecord01, b: AuthRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
