/** Domain types for billing / BillingRecord25 */
export type BillingRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord25Status;
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

export interface BillingRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord25ListResponse {
  items: BillingRecord25[];
  total?: number;
}

export interface BillingRecord25StatsResponse {
  activeCount: number;
}

export function isBillingRecord25Active(rec: BillingRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord25Label(rec: BillingRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord25ByPriority(a: BillingRecord25, b: BillingRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
