/** Domain types for billing / BillingRecord28 */
export type BillingRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord28Status;
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

export interface BillingRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord28ListResponse {
  items: BillingRecord28[];
  total?: number;
}

export interface BillingRecord28StatsResponse {
  activeCount: number;
}

export function isBillingRecord28Active(rec: BillingRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord28Label(rec: BillingRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord28ByPriority(a: BillingRecord28, b: BillingRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
