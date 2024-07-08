/** Domain types for auth / AuthRecord23 */
export type AuthRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord23Status;
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

export interface AuthRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord23ListResponse {
  items: AuthRecord23[];
  total?: number;
}

export interface AuthRecord23StatsResponse {
  activeCount: number;
}

export function isAuthRecord23Active(rec: AuthRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord23Label(rec: AuthRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord23ByPriority(a: AuthRecord23, b: AuthRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
