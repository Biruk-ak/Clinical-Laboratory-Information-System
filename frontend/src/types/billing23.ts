/** Domain types for billing / BillingRecord23 */
export type BillingRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord23Status;
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

export interface BillingRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord23ListResponse {
  items: BillingRecord23[];
  total?: number;
}

export interface BillingRecord23StatsResponse {
  activeCount: number;
}

export function isBillingRecord23Active(rec: BillingRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord23Label(rec: BillingRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord23ByPriority(a: BillingRecord23, b: BillingRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
