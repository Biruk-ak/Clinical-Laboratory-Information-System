/** Domain types for billing / BillingRecord24 */
export type BillingRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord24Status;
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

export interface BillingRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord24ListResponse {
  items: BillingRecord24[];
  total?: number;
}

export interface BillingRecord24StatsResponse {
  activeCount: number;
}

export function isBillingRecord24Active(rec: BillingRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord24Label(rec: BillingRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord24ByPriority(a: BillingRecord24, b: BillingRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
