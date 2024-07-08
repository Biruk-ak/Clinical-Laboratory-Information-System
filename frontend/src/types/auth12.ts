/** Domain types for auth / AuthRecord12 */
export type AuthRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord12Status;
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

export interface AuthRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord12ListResponse {
  items: AuthRecord12[];
  total?: number;
}

export interface AuthRecord12StatsResponse {
  activeCount: number;
}

export function isAuthRecord12Active(rec: AuthRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord12Label(rec: AuthRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord12ByPriority(a: AuthRecord12, b: AuthRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
