/** Domain types for billing / BillingRecord11 */
export type BillingRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord11Status;
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

export interface BillingRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord11ListResponse {
  items: BillingRecord11[];
  total?: number;
}

export interface BillingRecord11StatsResponse {
  activeCount: number;
}

export function isBillingRecord11Active(rec: BillingRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord11Label(rec: BillingRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord11ByPriority(a: BillingRecord11, b: BillingRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
