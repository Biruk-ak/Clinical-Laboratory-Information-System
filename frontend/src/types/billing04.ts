/** Domain types for billing / BillingRecord04 */
export type BillingRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord04Status;
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

export interface BillingRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord04ListResponse {
  items: BillingRecord04[];
  total?: number;
}

export interface BillingRecord04StatsResponse {
  activeCount: number;
}

export function isBillingRecord04Active(rec: BillingRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord04Label(rec: BillingRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord04ByPriority(a: BillingRecord04, b: BillingRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
