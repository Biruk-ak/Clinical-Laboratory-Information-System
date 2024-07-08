/** Domain types for auth / AuthRecord11 */
export type AuthRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord11Status;
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

export interface AuthRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord11ListResponse {
  items: AuthRecord11[];
  total?: number;
}

export interface AuthRecord11StatsResponse {
  activeCount: number;
}

export function isAuthRecord11Active(rec: AuthRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord11Label(rec: AuthRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord11ByPriority(a: AuthRecord11, b: AuthRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
