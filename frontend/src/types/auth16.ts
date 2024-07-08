/** Domain types for auth / AuthRecord16 */
export type AuthRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord16Status;
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

export interface AuthRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord16ListResponse {
  items: AuthRecord16[];
  total?: number;
}

export interface AuthRecord16StatsResponse {
  activeCount: number;
}

export function isAuthRecord16Active(rec: AuthRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord16Label(rec: AuthRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord16ByPriority(a: AuthRecord16, b: AuthRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
