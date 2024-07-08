/** Domain types for auth / AuthRecord15 */
export type AuthRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord15Status;
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

export interface AuthRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord15ListResponse {
  items: AuthRecord15[];
  total?: number;
}

export interface AuthRecord15StatsResponse {
  activeCount: number;
}

export function isAuthRecord15Active(rec: AuthRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord15Label(rec: AuthRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord15ByPriority(a: AuthRecord15, b: AuthRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
