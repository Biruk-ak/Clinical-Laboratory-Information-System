/** Domain types for auth / AuthRecord10 */
export type AuthRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord10Status;
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

export interface AuthRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord10ListResponse {
  items: AuthRecord10[];
  total?: number;
}

export interface AuthRecord10StatsResponse {
  activeCount: number;
}

export function isAuthRecord10Active(rec: AuthRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord10Label(rec: AuthRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord10ByPriority(a: AuthRecord10, b: AuthRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
