/** Domain types for auth / AuthRecord06 */
export type AuthRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord06Status;
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

export interface AuthRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord06ListResponse {
  items: AuthRecord06[];
  total?: number;
}

export interface AuthRecord06StatsResponse {
  activeCount: number;
}

export function isAuthRecord06Active(rec: AuthRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord06Label(rec: AuthRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord06ByPriority(a: AuthRecord06, b: AuthRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
