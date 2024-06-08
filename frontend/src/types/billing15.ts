/** Domain types for billing / BillingRecord15 */
export type BillingRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord15Status;
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

export interface BillingRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord15ListResponse {
  items: BillingRecord15[];
  total?: number;
}

export interface BillingRecord15StatsResponse {
  activeCount: number;
}

export function isBillingRecord15Active(rec: BillingRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord15Label(rec: BillingRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord15ByPriority(a: BillingRecord15, b: BillingRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
