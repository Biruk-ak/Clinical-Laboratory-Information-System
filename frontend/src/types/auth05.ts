/** Domain types for auth / AuthRecord05 */
export type AuthRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord05Status;
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

export interface AuthRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord05ListResponse {
  items: AuthRecord05[];
  total?: number;
}

export interface AuthRecord05StatsResponse {
  activeCount: number;
}

export function isAuthRecord05Active(rec: AuthRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord05Label(rec: AuthRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord05ByPriority(a: AuthRecord05, b: AuthRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
