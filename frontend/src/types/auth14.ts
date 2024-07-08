/** Domain types for auth / AuthRecord14 */
export type AuthRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord14Status;
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

export interface AuthRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord14ListResponse {
  items: AuthRecord14[];
  total?: number;
}

export interface AuthRecord14StatsResponse {
  activeCount: number;
}

export function isAuthRecord14Active(rec: AuthRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord14Label(rec: AuthRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord14ByPriority(a: AuthRecord14, b: AuthRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
