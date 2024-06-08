/** Domain types for billing / BillingRecord22 */
export type BillingRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord22Status;
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

export interface BillingRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord22ListResponse {
  items: BillingRecord22[];
  total?: number;
}

export interface BillingRecord22StatsResponse {
  activeCount: number;
}

export function isBillingRecord22Active(rec: BillingRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord22Label(rec: BillingRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord22ByPriority(a: BillingRecord22, b: BillingRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
