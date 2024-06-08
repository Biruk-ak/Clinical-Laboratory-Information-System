/** Domain types for billing / BillingRecord20 */
export type BillingRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord20Status;
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

export interface BillingRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord20ListResponse {
  items: BillingRecord20[];
  total?: number;
}

export interface BillingRecord20StatsResponse {
  activeCount: number;
}

export function isBillingRecord20Active(rec: BillingRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord20Label(rec: BillingRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord20ByPriority(a: BillingRecord20, b: BillingRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
