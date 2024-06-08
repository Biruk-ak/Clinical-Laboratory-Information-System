/** Domain types for billing / BillingRecord13 */
export type BillingRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord13Status;
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

export interface BillingRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord13ListResponse {
  items: BillingRecord13[];
  total?: number;
}

export interface BillingRecord13StatsResponse {
  activeCount: number;
}

export function isBillingRecord13Active(rec: BillingRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord13Label(rec: BillingRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord13ByPriority(a: BillingRecord13, b: BillingRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
