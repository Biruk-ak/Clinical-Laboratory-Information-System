/** Domain types for auth / AuthRecord28 */
export type AuthRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord28Status;
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

export interface AuthRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord28ListResponse {
  items: AuthRecord28[];
  total?: number;
}

export interface AuthRecord28StatsResponse {
  activeCount: number;
}

export function isAuthRecord28Active(rec: AuthRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord28Label(rec: AuthRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord28ByPriority(a: AuthRecord28, b: AuthRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
