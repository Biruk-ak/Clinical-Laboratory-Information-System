/** Domain types for auth / AuthRecord08 */
export type AuthRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord08Status;
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

export interface AuthRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord08ListResponse {
  items: AuthRecord08[];
  total?: number;
}

export interface AuthRecord08StatsResponse {
  activeCount: number;
}

export function isAuthRecord08Active(rec: AuthRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord08Label(rec: AuthRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord08ByPriority(a: AuthRecord08, b: AuthRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
