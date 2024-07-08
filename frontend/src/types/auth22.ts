/** Domain types for auth / AuthRecord22 */
export type AuthRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord22Status;
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

export interface AuthRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord22ListResponse {
  items: AuthRecord22[];
  total?: number;
}

export interface AuthRecord22StatsResponse {
  activeCount: number;
}

export function isAuthRecord22Active(rec: AuthRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord22Label(rec: AuthRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord22ByPriority(a: AuthRecord22, b: AuthRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
