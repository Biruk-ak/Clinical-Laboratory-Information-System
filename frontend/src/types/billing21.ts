/** Domain types for billing / BillingRecord21 */
export type BillingRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord21Status;
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

export interface BillingRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord21ListResponse {
  items: BillingRecord21[];
  total?: number;
}

export interface BillingRecord21StatsResponse {
  activeCount: number;
}

export function isBillingRecord21Active(rec: BillingRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord21Label(rec: BillingRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord21ByPriority(a: BillingRecord21, b: BillingRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
