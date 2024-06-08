/** Domain types for billing / BillingRecord07 */
export type BillingRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord07Status;
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

export interface BillingRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord07ListResponse {
  items: BillingRecord07[];
  total?: number;
}

export interface BillingRecord07StatsResponse {
  activeCount: number;
}

export function isBillingRecord07Active(rec: BillingRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord07Label(rec: BillingRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord07ByPriority(a: BillingRecord07, b: BillingRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
