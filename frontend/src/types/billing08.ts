/** Domain types for billing / BillingRecord08 */
export type BillingRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord08Status;
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

export interface BillingRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord08ListResponse {
  items: BillingRecord08[];
  total?: number;
}

export interface BillingRecord08StatsResponse {
  activeCount: number;
}

export function isBillingRecord08Active(rec: BillingRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord08Label(rec: BillingRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord08ByPriority(a: BillingRecord08, b: BillingRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
