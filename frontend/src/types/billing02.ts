/** Domain types for billing / BillingRecord02 */
export type BillingRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord02Status;
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

export interface BillingRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord02ListResponse {
  items: BillingRecord02[];
  total?: number;
}

export interface BillingRecord02StatsResponse {
  activeCount: number;
}

export function isBillingRecord02Active(rec: BillingRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord02Label(rec: BillingRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord02ByPriority(a: BillingRecord02, b: BillingRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
