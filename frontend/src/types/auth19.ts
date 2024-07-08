/** Domain types for auth / AuthRecord19 */
export type AuthRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord19Status;
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

export interface AuthRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord19ListResponse {
  items: AuthRecord19[];
  total?: number;
}

export interface AuthRecord19StatsResponse {
  activeCount: number;
}

export function isAuthRecord19Active(rec: AuthRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord19Label(rec: AuthRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord19ByPriority(a: AuthRecord19, b: AuthRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
