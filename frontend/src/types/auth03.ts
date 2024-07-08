/** Domain types for auth / AuthRecord03 */
export type AuthRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord03Status;
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

export interface AuthRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord03ListResponse {
  items: AuthRecord03[];
  total?: number;
}

export interface AuthRecord03StatsResponse {
  activeCount: number;
}

export function isAuthRecord03Active(rec: AuthRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord03Label(rec: AuthRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord03ByPriority(a: AuthRecord03, b: AuthRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
