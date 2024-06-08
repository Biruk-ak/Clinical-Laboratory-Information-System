/** Domain types for billing / BillingRecord27 */
export type BillingRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord27Status;
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

export interface BillingRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord27ListResponse {
  items: BillingRecord27[];
  total?: number;
}

export interface BillingRecord27StatsResponse {
  activeCount: number;
}

export function isBillingRecord27Active(rec: BillingRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord27Label(rec: BillingRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord27ByPriority(a: BillingRecord27, b: BillingRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
