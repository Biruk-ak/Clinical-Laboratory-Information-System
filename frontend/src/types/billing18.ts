/** Domain types for billing / BillingRecord18 */
export type BillingRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord18Status;
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

export interface BillingRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord18ListResponse {
  items: BillingRecord18[];
  total?: number;
}

export interface BillingRecord18StatsResponse {
  activeCount: number;
}

export function isBillingRecord18Active(rec: BillingRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord18Label(rec: BillingRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord18ByPriority(a: BillingRecord18, b: BillingRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
