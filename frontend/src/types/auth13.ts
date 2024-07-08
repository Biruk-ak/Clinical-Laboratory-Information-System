/** Domain types for auth / AuthRecord13 */
export type AuthRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord13Status;
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

export interface AuthRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord13ListResponse {
  items: AuthRecord13[];
  total?: number;
}

export interface AuthRecord13StatsResponse {
  activeCount: number;
}

export function isAuthRecord13Active(rec: AuthRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord13Label(rec: AuthRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord13ByPriority(a: AuthRecord13, b: AuthRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
