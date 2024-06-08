/** Domain types for billing / BillingRecord10 */
export type BillingRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord10Status;
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

export interface BillingRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord10ListResponse {
  items: BillingRecord10[];
  total?: number;
}

export interface BillingRecord10StatsResponse {
  activeCount: number;
}

export function isBillingRecord10Active(rec: BillingRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord10Label(rec: BillingRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord10ByPriority(a: BillingRecord10, b: BillingRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
