/** Domain types for billing / BillingRecord01 */
export type BillingRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord01Status;
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

export interface BillingRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord01ListResponse {
  items: BillingRecord01[];
  total?: number;
}

export interface BillingRecord01StatsResponse {
  activeCount: number;
}

export function isBillingRecord01Active(rec: BillingRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord01Label(rec: BillingRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord01ByPriority(a: BillingRecord01, b: BillingRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
