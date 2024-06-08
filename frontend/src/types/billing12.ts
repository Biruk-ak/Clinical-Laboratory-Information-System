/** Domain types for billing / BillingRecord12 */
export type BillingRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord12Status;
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

export interface BillingRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord12ListResponse {
  items: BillingRecord12[];
  total?: number;
}

export interface BillingRecord12StatsResponse {
  activeCount: number;
}

export function isBillingRecord12Active(rec: BillingRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord12Label(rec: BillingRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord12ByPriority(a: BillingRecord12, b: BillingRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
