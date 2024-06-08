/** Domain types for billing / BillingRecord16 */
export type BillingRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord16Status;
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

export interface BillingRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord16ListResponse {
  items: BillingRecord16[];
  total?: number;
}

export interface BillingRecord16StatsResponse {
  activeCount: number;
}

export function isBillingRecord16Active(rec: BillingRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord16Label(rec: BillingRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord16ByPriority(a: BillingRecord16, b: BillingRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
