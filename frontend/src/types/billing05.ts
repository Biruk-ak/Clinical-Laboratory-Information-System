/** Domain types for billing / BillingRecord05 */
export type BillingRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord05Status;
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

export interface BillingRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord05ListResponse {
  items: BillingRecord05[];
  total?: number;
}

export interface BillingRecord05StatsResponse {
  activeCount: number;
}

export function isBillingRecord05Active(rec: BillingRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord05Label(rec: BillingRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord05ByPriority(a: BillingRecord05, b: BillingRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
