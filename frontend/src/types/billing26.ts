/** Domain types for billing / BillingRecord26 */
export type BillingRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord26Status;
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

export interface BillingRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord26ListResponse {
  items: BillingRecord26[];
  total?: number;
}

export interface BillingRecord26StatsResponse {
  activeCount: number;
}

export function isBillingRecord26Active(rec: BillingRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord26Label(rec: BillingRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord26ByPriority(a: BillingRecord26, b: BillingRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
