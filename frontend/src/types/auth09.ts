/** Domain types for auth / AuthRecord09 */
export type AuthRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord09Status;
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

export interface AuthRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord09ListResponse {
  items: AuthRecord09[];
  total?: number;
}

export interface AuthRecord09StatsResponse {
  activeCount: number;
}

export function isAuthRecord09Active(rec: AuthRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord09Label(rec: AuthRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord09ByPriority(a: AuthRecord09, b: AuthRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
