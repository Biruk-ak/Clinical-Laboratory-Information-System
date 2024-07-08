/** Domain types for auth / AuthRecord21 */
export type AuthRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord21Status;
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

export interface AuthRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord21ListResponse {
  items: AuthRecord21[];
  total?: number;
}

export interface AuthRecord21StatsResponse {
  activeCount: number;
}

export function isAuthRecord21Active(rec: AuthRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord21Label(rec: AuthRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord21ByPriority(a: AuthRecord21, b: AuthRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
