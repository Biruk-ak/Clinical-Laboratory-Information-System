/** Domain types for auth / AuthRecord20 */
export type AuthRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord20Status;
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

export interface AuthRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord20ListResponse {
  items: AuthRecord20[];
  total?: number;
}

export interface AuthRecord20StatsResponse {
  activeCount: number;
}

export function isAuthRecord20Active(rec: AuthRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord20Label(rec: AuthRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord20ByPriority(a: AuthRecord20, b: AuthRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
