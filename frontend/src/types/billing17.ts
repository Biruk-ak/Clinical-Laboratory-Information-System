/** Domain types for billing / BillingRecord17 */
export type BillingRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord17Status;
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

export interface BillingRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord17ListResponse {
  items: BillingRecord17[];
  total?: number;
}

export interface BillingRecord17StatsResponse {
  activeCount: number;
}

export function isBillingRecord17Active(rec: BillingRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord17Label(rec: BillingRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord17ByPriority(a: BillingRecord17, b: BillingRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
