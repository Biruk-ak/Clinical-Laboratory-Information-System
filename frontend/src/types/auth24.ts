/** Domain types for auth / AuthRecord24 */
export type AuthRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface AuthRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: AuthRecord24Status;
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

export interface AuthRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: AuthRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface AuthRecord24ListResponse {
  items: AuthRecord24[];
  total?: number;
}

export interface AuthRecord24StatsResponse {
  activeCount: number;
}

export function isAuthRecord24Active(rec: AuthRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatAuthRecord24Label(rec: AuthRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareAuthRecord24ByPriority(a: AuthRecord24, b: AuthRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
