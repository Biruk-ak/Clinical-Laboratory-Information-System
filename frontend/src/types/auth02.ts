/** Domain types for auth / AuthRecord02 */
export type AuthRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord02Status;
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

export interface AuthRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord02ListResponse {
  items: AuthRecord02[];
  total?: number;
}

export interface AuthRecord02StatsResponse {
  activeCount: number;
}

export function isAuthRecord02Active(rec: AuthRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord02Label(rec: AuthRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord02ByPriority(a: AuthRecord02, b: AuthRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
