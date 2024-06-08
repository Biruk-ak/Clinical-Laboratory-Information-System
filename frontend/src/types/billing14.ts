/** Domain types for billing / BillingRecord14 */
export type BillingRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord14Status;
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

export interface BillingRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord14ListResponse {
  items: BillingRecord14[];
  total?: number;
}

export interface BillingRecord14StatsResponse {
  activeCount: number;
}

export function isBillingRecord14Active(rec: BillingRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord14Label(rec: BillingRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord14ByPriority(a: BillingRecord14, b: BillingRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
