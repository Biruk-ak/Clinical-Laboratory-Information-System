/** Domain types for auth / AuthRecord26 */
export type AuthRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord26Status;
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

export interface AuthRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord26ListResponse {
  items: AuthRecord26[];
  total?: number;
}

export interface AuthRecord26StatsResponse {
  activeCount: number;
}

export function isAuthRecord26Active(rec: AuthRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord26Label(rec: AuthRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord26ByPriority(a: AuthRecord26, b: AuthRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
