/** Domain types for billing / BillingRecord06 */
export type BillingRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord06Status;
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

export interface BillingRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord06ListResponse {
  items: BillingRecord06[];
  total?: number;
}

export interface BillingRecord06StatsResponse {
  activeCount: number;
}

export function isBillingRecord06Active(rec: BillingRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord06Label(rec: BillingRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord06ByPriority(a: BillingRecord06, b: BillingRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
