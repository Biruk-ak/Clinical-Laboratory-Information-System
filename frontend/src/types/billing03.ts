/** Domain types for billing / BillingRecord03 */
export type BillingRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord03Status;
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

export interface BillingRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord03ListResponse {
  items: BillingRecord03[];
  total?: number;
}

export interface BillingRecord03StatsResponse {
  activeCount: number;
}

export function isBillingRecord03Active(rec: BillingRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord03Label(rec: BillingRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord03ByPriority(a: BillingRecord03, b: BillingRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
