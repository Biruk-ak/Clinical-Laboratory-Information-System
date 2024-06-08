/** Domain types for billing / BillingRecord19 */
export type BillingRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord19Status;
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

export interface BillingRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord19ListResponse {
  items: BillingRecord19[];
  total?: number;
}

export interface BillingRecord19StatsResponse {
  activeCount: number;
}

export function isBillingRecord19Active(rec: BillingRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord19Label(rec: BillingRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord19ByPriority(a: BillingRecord19, b: BillingRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
