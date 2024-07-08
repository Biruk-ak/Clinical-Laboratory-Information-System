/** Domain types for auth / AuthRecord25 */
export type AuthRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord25Status;
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

export interface AuthRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord25ListResponse {
  items: AuthRecord25[];
  total?: number;
}

export interface AuthRecord25StatsResponse {
  activeCount: number;
}

export function isAuthRecord25Active(rec: AuthRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord25Label(rec: AuthRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord25ByPriority(a: AuthRecord25, b: AuthRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
